package api

import (
	"github.com/johnnadratowski/golang-neo4j-bolt-driver/errors"
	"strconv"
)

//MATCH (u:User), (n:User) WHERE ID(u) = 30 AND ID(n) = 238 return exists( (u)-[:LIKE]->(n) )
//MATCH (u:User) WHERE ID(u) = 30 MATCH (n:User) WHERE ID(n) = 238 CREATE (n)<-[:LIKE]-(u) return u, n
//MATCH (u)<-[r:LIKE]-(n) WHERE ID(u) = 30 AND ID(n) = 238 DELETE r
//MATCH (n)-[r:LIKE]-(u) WHERE ID(u) = 30 AND ID(n) = 238 DETACH DELETE r

func (app *App) dbMatchs(m Match) (valid bool, err error) {

	if app.dbExistBlocked(m) {
		err = errors.New("Blocked Relation")
		return false, err
	}

	if m.action == "LIKE" && app.dbExistRel(m, like) == false && app.dbExistMatch(m) == false {
		app.dbCreateLike(m)
	} else if m.action == "DISLIKE" && app.dbExistRel(m, dislike) == false {
		app.dbCreateDislike(m)
	} else if m.action == "BLOCK" {
		app.dbCreateBlock(m)
	}
	return true, nil
}

func (app *App) dbExistBlocked(m Match) bool {

	ExistQuery := `MATCH (u:User), (n:User) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` RETURN EXISTS( (u)-[:BLOCK]->(n) )`
	data, _, _, err := app.Neo.QueryNeoAll(ExistQuery, nil)
	if err != nil {
		return false
	} else if data[0][0] == false {
		return false
	}
	return true
}

func (app *App) dbCreateLike(m Match) (valid bool) {

	if app.dbExistRevLike(m) == false && app.dbExistMatch(m) == false {
		app.dbDeleteDirectionalRelation(m, "")
		UpdateRating(m.idTo, "LIKE")
		MatchQuery := `MATCH (u:User), (n:User) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` CREATE (u)-[:LIKE]->(n)`
		_, _, _, err := app.Neo.QueryNeoAll(MatchQuery, nil)
		if err != nil {
			return false
		}
		newEvent(m.c, func(name string) string {
			return name + " like you!!! ❤️❤️"
		})
		return true
	} else {
		UpdateRating(m.idTo, "LIKE")
		app.dbSetMatch(m)
	}
	return false
}

func (app *App) dbSetMatch(m Match) (valid bool) {

	app.dbDeleteRelation(m, "")
	UpdateRating(m.idTo, "MATCHED")
	UpdateRating(m.idFrom, "MATCHED")
	MatchQuery := `MATCH (u:User), (n:User) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` CREATE (u)-[:MATCHED]->(n)`
	_, _, _, err := app.Neo.QueryNeoAll(MatchQuery, nil)
	if err != nil {
		return false
	}
	newEvent(m.c, func(name string) string {
		return "It's a match!!! With " + name
	})
	return true
}

func (app *App) dbCreateBlock(m Match) (valid bool) {

	app.dbDeleteDirectionalRelation(m, "")
	UpdateRating(m.idTo, "BLOCK")
	MatchQuery := `MATCH (u:User), (n:User) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` CREATE (u)-[:BLOCK]->(n)`
	_, _, _, err := app.Neo.QueryNeoAll(MatchQuery, nil)
	if err != nil {
		return false
	}
	return true
}

func (app *App) dbCreateDislike(m Match) (valid bool) {

	if app.dbExistMatch(m) == true {
		app.dbDeleteRelation(m, matched)

	}
	if app.dbExistRel(m, "LIKE") {
		newEvent(m.c, func(name string) string {
			return name + " doesn't like you anymore 😱"
		})
	}
	app.dbDeleteDirectionalRelation(m, "")
	UpdateRating(m.idTo, "DISLIKE")
	MatchQuery := `MATCH (u:User), (n:User) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` CREATE (u)-[:DISLIKE]->(n)`
	_, _, _, err := app.Neo.QueryNeoAll(MatchQuery, nil)
	if err != nil {
		return false
	}
	return true
}

func (app *App) dbExistMatch(m Match) (valid bool) {

	ExistQuery := `MATCH (u:User), (n:User) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` RETURN EXISTS( (u)-[:MATCHED]-(n) )`
	data, _, _, err := app.Neo.QueryNeoAll(ExistQuery, nil)
	if err != nil {
		return false
	} else if len(data) != 0 && data[0][0] == false {
		return false
	}
	return true
}

func (app *App) dbExistRel(m Match, Rel string) (valid bool) {

	ExistQuery := `MATCH (u:User), (n:User) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` RETURN EXISTS( (u)-[:` + Rel + `]->(n) )`
	data, _, _, err := app.Neo.QueryNeoAll(ExistQuery, nil)
	if err != nil {
		return false
	} else if len(data) != 0 && data[0][0] == false {
		return false
	}
	return true
}

func (app *App) dbExistRevLike(m Match) (valid bool) {

	ExistQuery := `MATCH (u:User), (n:User) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` RETURN EXISTS( (u)<-[:LIKE]-(n) )`
	data, _, _, err := app.Neo.QueryNeoAll(ExistQuery, nil)
	if err != nil {
		return false
	} else if len(data) != 0 && data[0][0] == false {
		return false
	}
	return true
}

func (app *App) dbDeleteDirectionalRelation(m Match, Rel string) (valid bool) {

	if Rel != "" {
		DeleteQuery := `MATCH (u)-[t:` + Rel + `]->(n) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` DETACH DELETE t`
		_, _, _, err := app.Neo.QueryNeoAll(DeleteQuery, nil)
		if err != nil {
			return false
		}
	} else {
		DeleteQuery := `MATCH (u:User)-[r]->(n:User) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` DETACH DELETE r`
		_, _, _, err := app.Neo.QueryNeoAll(DeleteQuery, nil)
		if err != nil {
			return false
		}
	}
	return true
}

func (app *App) dbDeleteRelation(m Match, Rel string) (valid bool) {

	if Rel != "" {
		DeleteQuery := `MATCH (n)-[r:` + Rel + `]-(u) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` DETACH DELETE r`
		_, _, _, err := app.Neo.QueryNeoAll(DeleteQuery, nil)
		if err != nil {
			return false
		}
	} else {
		DeleteQuery := `MATCH (u:User)-[r]-(n:User) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` DETACH DELETE r`
		_, _, _, err := app.Neo.QueryNeoAll(DeleteQuery, nil)
		if err != nil {
			return false
		}
	}
	return true
}

func (app *App) dbGetRelationType(m Match) (relation string) {

	ExistQuery := `MATCH (u)<-[r]-(n) WHERE ID(u) = ` + strconv.Itoa(m.idFrom) + ` AND ID(n) = ` + strconv.Itoa(m.idTo) + ` RETURN TYPE(r)`
	data, _, _, _ := app.Neo.QueryNeoAll(ExistQuery, nil)
	if len(data) != 0 {
		return data[0][0].(string)
	}
	return "none"
}

package api

import (
	"github.com/johnnadratowski/golang-neo4j-bolt-driver/structures/graph"
	"strconv"
)

func (app *App) dbGetTagList() (ret []Tag) {
	q := `
MATCH (a:TAG)
RETURN a
ORDER BY a.value
`
	data, _, _, _ := app.Neo.QueryNeoAll(q, map[string]interface{}{})
	for _, tab := range data {
		ret = append(ret, Tag{
			tab[0].(graph.Node).Properties["key"].(string),
			tab[0].(graph.Node).Properties["text"].(string),
			tab[0].(graph.Node).Properties["value"].(string),
		})
	}
	return
}

func (app *App) dbGetUserTags(username string) (ret []Tag) {
	q := `MATCH (u:User {username: "` + username + `"})-[:TAGGED]-(r) RETURN r ORDER BY r.value`
	data, _, _, _ := app.Neo.QueryNeoAll(q, map[string]interface{}{})
	for _, tab := range data {
		ret = append(ret, Tag{
			tab[0].(graph.Node).Properties["key"].(string),
			tab[0].(graph.Node).Properties["text"].(string),
			tab[0].(graph.Node).Properties["value"].(string),
		})
	}
	return
}

func (app *App) insertTag(t Tag, Id int64) {
	q := `MATCH (u:User) WHERE ID(u) = ` + strconv.Itoa(int(Id)) + ` CREATE (t:TAG{key: {key}, text:{text}, value:{value}})<-[:TAGGED]-(u)`
	st := app.PrepareStatement(q)
	ExecuteStatement(st, MapOf(t))
}

func (app *App) tagExist(value string) bool {
	q := `MATCH (t:TAG) WHERE t.value = "` + value + `" RETURN t`
	data, _, _, _ := app.Neo.QueryNeoAll(q, nil)
	if len(data) == 0 {
		return false
	}
	return true
}

func (app *App) tagRelationExist(Id int, value string) bool {
	q := `MATCH (u:User), (t:TAG) WHERE ID(u) = ` + strconv.Itoa(Id) + ` AND t.value = "` + value + `" RETURN EXISTS( (u)-[:TAGGED]->(t) )`
	data, _, _, _ := app.Neo.QueryNeoAll(q, nil)
	if len(data) != 0 && data[0][0] == true {
		return true
	}
	return false
}

func (app *App) createTagRelation(Id int, value string) bool {
	q := `MATCH (u:User), (t:TAG) WHERE ID(u) = ` + strconv.Itoa(Id) + ` AND t.value = "` + value + `" CREATE p=(u)-[r:TAGGED]->(t) return p`
	data, _, _, _ := app.Neo.QueryNeoAll(q, nil)
	if len(data) == 0 {
		return false
	}
	return true
}

package api

import (
	"encoding/json"
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/johnnadratowski/golang-neo4j-bolt-driver/structures/graph"
	"gopkg.in/olahol/melody.v1"
	"strconv"
	"time"
)

type format func(name string) (message string)

func newEventMessage(msg []byte) {
	var m Messages
	_ = json.Unmarshal(msg, &m)
	u, _ := app.dbGetUserProfile(int(m.Author))
	message := u.Properties["username"].(string) + " sended you a message"
	app.postNotification(message, m.To, m.Author, 3)
	app.postEvent(message, m.To, m.Author, 3)
}

func newEvent(c *gin.Context, fn format) {
	var m Match
	claims := jwt.MapClaims{}
	valid, _ := ValidateToken(c, &claims)
	n, _ := strconv.Atoi(c.Param("id"))
	userId := int64(n)
	var authorId int64
	if valid {
		authorId = int64(claims["id"].(float64))
	} else {
		authorId = 0
	}
	m.idFrom = int(userId)
	m.idTo = int(authorId)
	if app.dbExistBlocked(m) == true {
		return
	}
	u, _ := app.getUser(int(authorId), "")
	message := fn(u.Username)
	app.postNotification(message, userId, authorId, 0)
	app.postEvent(message, userId, authorId, 0)
	UpdateLastConn(int(authorId))
}

func (app *App) postEvent(message string, userId, authorId, subjectId int64) {
	n := Notification{
		message,
		0,
		userId,
		authorId,
		subjectId,
	}
	msg, _ := json.Marshal(n)
	app.dbInsertEvent(msg)
}

func (app *App) dbInsertEvent(byt []byte) {
	var dat map[string]interface{}
	if err := json.Unmarshal(byt, &dat); err != nil {
		panic(err)
	}
	dat["message"] = dat["message"].(string)
	dat["author_id"] = int64(dat["author_id"].(float64))
	dat["user_id"] = int64(dat["user_id"].(float64))
	dat["subject_id"] = int64(dat["subject_id"].(float64))
	q := `
MATCH (a:User)
WHERE ID(a)={user_id}
CREATE (a)<-[s:TO]-(n:Event {message:{message}, author_id: {author_id}, subject_id: {subject_id}})
RETURN ID(n)
`
	app.Neo.QueryNeoAll(q, dat)
}

func getHistoryHandler(c *gin.Context) {
	n, _ := strconv.Atoi(c.Param("user"))
	userId := int64(n)
	q := `
MATCH (n:Event)-[:TO]-(u:User) WHERE ID(u) = {user_id} RETURN n ORDER by ID(n)
`
	ntfs := make([]Notification, 0)
	data, _, _, _ := app.Neo.QueryNeoAll(q, map[string]interface{}{"user_id": userId})
	for _, tab := range data {
		ntfs = append(ntfs, Notification{
			tab[0].(graph.Node).Properties["message"].(string),
			int64(tab[0].(graph.Node).NodeIdentity),
			0,
			tab[0].(graph.Node).Properties["author_id"].(int64),
			tab[0].(graph.Node).Properties["subject_id"].(int64),
		})
	}
	c.JSON(200, ntfs)
}

func (app *App) onlineRefresh(id string) {
	lastConn := time.Now().Format(time.RFC3339Nano)
	q := `MATCH (u:User) WHERE id(u)=` + id + ` set u.online = true, u.last_conn= "` + lastConn + `"`
	app.Neo.QueryNeoAll(q, nil)
	app.alertOnline(true, id)
}

func (app *App) offlineWatcher() {
	for true {
		time.Sleep(time.Second * 10)
		q := `MATCH (u:User{online: true}) return u`
		data, _, _, _ := app.Neo.QueryNeoAll(q, nil)
		for _, node := range data {
			lc := node[0].(graph.Node).Properties["last_conn"]
			tp, _ := time.Parse(time.RFC3339Nano, lc.(string))
			if time.Since(tp).Seconds() > 15 {
				s := strconv.FormatInt(node[0].(graph.Node).NodeIdentity, 10)
				q := `MATCH (u:User) WHERE id(u)=` + s + ` set u.online = false`
				app.Neo.QueryNeoAll(q, nil)
				app.alertOnline(false, s)
			}
		}
	}
}

func (app *App) alertOnline(online bool, id string) {
	url := "/api/online/websocket/" + id
	msg, _ := json.Marshal(online)

	_ = app.M.BroadcastFilter(msg, func(session *melody.Session) bool {
		return session.Request.URL.Path == url
	})
}

func (app *App) postNotification(message string, userId, authorId, subjectId int64) {
	n := Notification{
		message,
		0,
		userId,
		authorId,
		subjectId,
	}
	id := strconv.FormatInt(userId, 10)
	url := "/api/notifications/websocket/" + id
	msg, _ := json.Marshal(n)
	var err error
	n.Id, err = app.dbInsertNotification(msg)
	if err != nil {
	} else {
		msg, _ = json.Marshal(n)

		time.Sleep(time.Second * 1)
		_ = app.M.BroadcastFilter(msg, func(session *melody.Session) bool {
			return session.Request.URL.Path == url
		})
	}
}

func (app *App) dbInsertNotification(byt []byte) (int64, error) {
	var dat map[string]interface{}
	if err := json.Unmarshal(byt, &dat); err != nil {
		panic(err)
	}
	dat["message"] = dat["message"].(string)
	dat["author_id"] = int64(dat["author_id"].(float64))
	dat["user_id"] = int64(dat["user_id"].(float64))
	dat["subject_id"] = int64(dat["subject_id"].(float64))
	q := `
MATCH (a:User)
WHERE ID(a)={user_id}
CREATE (a)<-[s:TO]-(n:Notif {message:{message}, author_id: {author_id}, subject_id: {subject_id}})
RETURN ID(n)
`
	data, _, _, _ := app.Neo.QueryNeoAll(q, dat)
	if len(data) == 0 {
		return 0, errors.New("error: dbInsertNotification Failed")
	} else {
		return data[0][0].(int64), nil
	}
}

func notificationsHistoryHandler(c *gin.Context) {
	userId := c.Param("user")
	q := `
MATCH (n:Notif)-[:TO]-(u:User) where id(u)=` + string(userId) + ` RETURN n ORDER by ID(n)
`
	ntfs := make([]Notification, 0)
	data, _, _, _ := app.Neo.QueryNeoAll(q, map[string]interface{}{})
	for _, tab := range data {
		ntfs = append(ntfs, Notification{
			tab[0].(graph.Node).Properties["message"].(string),
			int64(tab[0].(graph.Node).NodeIdentity),
			0,
			tab[0].(graph.Node).Properties["author_id"].(int64),
			tab[0].(graph.Node).Properties["subject_id"].(int64),
		})
	}
	c.JSON(200, ntfs)
}

func notificationsDeleteHandler(c *gin.Context) {
	q := `MATCH (n:Notif)-[r]-(u) WHERE ID(n) = ` + c.Param("id") + ` DELETE r, n`
	st := app.PrepareStatement(q)
	ExecuteStatement(st, map[string]interface{}{})
	c.JSON(200, nil)
}

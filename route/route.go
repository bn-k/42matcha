package route

import (
	"fmt"
	"github.com/42matcha/dbmongo"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

type User struct {
	ID			bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name		string		`json:"name"`
	Gender		string		`json:"gender"`
	Email		string		`json:"email"`
	Picture		string		`json:"picture"`
}

var users []User
var i int

func Run() {
	i = 0
	dbmongo.Init()
	defer dbmongo.MgoSession.Close()

	router := gin.Default()
	store, _ := redis.NewStore(10, "tcp", "localhost:6379", "", []byte("secret"))

	mongoCo := dbmongo.MgoSession.Copy()
	colUser := mongoCo.DB("matcha").C("user")
	err := colUser.Find(nil).All(&users)
	if err != nil {
		fmt.Println("Something gones wrong in DBQuery")
	}

	router.Use(static.Serve("/static", static.LocalFile("./views", true)))
	router.Use(static.Serve("/img", static.LocalFile("./img", true)))
	router.Use(static.Serve("/js", static.LocalFile("./js", true)))
	router.Use(sessions.Sessions("mysession", store))
	router.LoadHTMLFiles("./views/index.html")

	router.GET("/", func(c *gin.Context) {
		session := sessions.Default(c)
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title":"app",
		})
		var count int
		v := session.Get("count")
		if v == nil {
			count = 0
		} else {
			count = v.(int)
			count++
		}
		session.Set("count", count)
		session.Save()
		c.JSON(200, gin.H{"count": count})
	})

	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {c.JSON(http.StatusOK, gin.H {"message": "api"})})
		api.GET("/user/:userID", userHandler)
		api.GET("/next", nextHandler)
		api.GET("/curr", currHandler)
		api.POST("/like/:userID", likeHandler)
		api.POST("/disl/:userID", dislHandler)
	}
	router.Run(":81")
}


func dbQuery (id string) User {
	var u User
	mongoCo := dbmongo.MgoSession.Copy()
	colUser := mongoCo.DB("matcha").C("user")
	err := colUser.Find(bson.M{"_id":id}).One(&u)
	fmt.Println(colUser.FindId(id))
	//fmt.Println(u.ID.Hex())
	if err != nil {
		fmt.Println("Something gones wrong in DBQuery")
	}
	return u
}

func userHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	id := c.Param("userID")
	u := dbQuery(id)
	c.JSON(http.StatusOK, gin.H {"Person": u})
}

func currHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	next := users[i]
	c.JSON(http.StatusOK, next)
}

func nextHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	i++
	if i == len(users) {
		i = 0
	}
	next := users[i]
	c.JSON(http.StatusOK, next)
}

func dislHandler(c *gin.Context) {
	if userid := c.Param("userID"); userid != "" {
		for i := 0; i < len(users); i++ {
			if users[i].ID.String() == string(userid){
				//implement a dislike with the uid
			}
		}
		c.JSON(http.StatusOK, &users)
	} else {
		c.AbortWithStatus(http.StatusNotFound)
	}
	c.Header("Content-Type", "application/json")
}

func likeHandler(c *gin.Context) {
	if userid := c.Param("userID"); userid != "" {
		for i := 0; i < len(users); i++ {
			if users[i].ID.String() == string(userid){
				//implement a like with the uid
			}
		}
		c.JSON(http.StatusOK, &users)
	} else {
		c.AbortWithStatus(http.StatusNotFound)
	}
	c.Header("Content-Type", "application/json")
}

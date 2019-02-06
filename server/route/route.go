package route

import (
	"fmt"
	"github.com/42matcha/server/dbmongo"
	"github.com/appleboy/gin-jwt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"time"
)

type User struct {
	ID			bson.ObjectId `json:"id" bson:"_id,omitempty"`
	UserName	string
	FirstName	string
	LastName	string
	Name		string		`json:"name"`
	Gender		string		`json:"gender"`
	Email		string		`json:"email"`
	Picture		string		`json:"picture"`
}



type login struct {
	Username string `form:"username" json:"username" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}


var identityKey = "id"
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
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "test zone",
		Key:         []byte("secret key"),
		Timeout:     time.Hour,
		MaxRefresh:  time.Hour,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*User); ok {
				return jwt.MapClaims{
					identityKey: v.UserName,
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			return &User{
				UserName: claims["id"].(string),
			}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var loginVals login
			if err := c.ShouldBind(&loginVals); err != nil {
				return "", jwt.ErrMissingLoginValues
			}
			userID := loginVals.Username
			password := loginVals.Password

			if (userID == "admin" && password == "admin") || (userID == "test" && password == "test") {
				return &User{
					UserName:  userID,
					LastName:  "Bo-Yi",
					FirstName: "Wu",
				}, nil
			}

			return nil, jwt.ErrFailedAuthentication
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			if v, ok := data.(*User); ok && v.UserName == "admin" {
				return true
			}

			return false
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		// TokenLookup is a string in the form of "<source>:<name>" that is used
		// to extract token from the request.
		// Optional. Default value "header:Authorization".
		// Possible values:
		// - "header:<name>"
		// - "query:<name>"
		// - "cookie:<name>"
		// - "param:<name>"
		TokenLookup: "header: Authorization, query: token, cookie: jwt",
		// TokenLookup: "query:token",
		// TokenLookup: "cookie:token",

		// TokenHeadName is a string in the header. Default value is "Bearer"
		TokenHeadName: "Bearer",

		// TimeFunc provides the current time. You can override it to use another time value. This is useful for testing or if your server uses a different time zone than your tokens.
		TimeFunc: time.Now,
	})

	if err != nil {
		fmt.Println("JWT Error:" + err.Error())
	}
	// Refresh time can be longer than token timeout
	auth := router.Group("/auth")
	{
		//auth.Use(gin.Logger())
		auth.Use(gin.Recovery())

		// Refresh time can be longer than token timeout
		auth.GET("/", func(c *gin.Context) {
			fmt.Println(c.Request.Header)
			c.JSON(200, gin.H{"Purpose": "Api for authorization"})
		})
		auth.POST("/login", authMiddleware.LoginHandler)
		auth.GET("/refresh_token", authMiddleware.RefreshHandler)
		auth.Use(authMiddleware.MiddlewareFunc())
		{
			auth.GET("/hello", helloHandler)
			auth.GET("/getuser", getUserHandler)
		}
	}
	router.Use(sessions.Sessions("mysession", store))

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"Purpose": "Api for matcha"})
	})

	api := router.Group("/api")
	{
		//api.GET("/", func(c *gin.Context) {c.JSON(http.StatusOK, gin.H {"message": "api"})})
		api.POST("/like", likeHandler)
		api.GET("/user/:userID", userHandler)
		api.GET("/next", nextHandler)
		api.GET("/curr", currHandler)
		api.POST("/disl/:userID", dislHandler)
		api.GET("/count", func(c *gin.Context) {
			session := sessions.Default(c)
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
			c.Header("Content-Type", "application/json")
			c.JSON(200, gin.H{"count": count})
		})
	}
	router.Run(":81")
}
func getUserHandler(c *gin.Context) {
	fmt.Println("getUserHandler")
	claims := jwt.ExtractClaims(c)
	user, _ := c.Get(identityKey)
	c.JSON(200, gin.H{
		"userID":   claims["id"],
		"userName": user.(*User).UserName,
		"Purpose":     "get User res",
	})
	fmt.Println("getUserHandler Ended")
}

func helloHandler(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	user, _ := c.Get(identityKey)
	fmt.Println(c.Request.Header)
	c.JSON(200, gin.H{
		"userID":   claims["id"],
		"userName": user.(*User).UserName,
		"text":     "Hello World.",
	})
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
	c.JSON(http.StatusOK, gin.H{"status":"liked"})
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
	c.JSON(http.StatusOK, gin.H{"status":"disliked"})
}


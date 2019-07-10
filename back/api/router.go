package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gopkg.in/olahol/melody.v1"
	"time"
)

func (app *App) routerAPI() {
	app.M = melody.New()
	app.R.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "DELETE"},
		AllowHeaders:     []string{"*", "Authorization", "Filters", "Suitor-Id", "User-Id"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	auth := app.R.Group("/auth")
	{
		auth.POST("/login", Login)
		auth.POST("/register", Register)
		auth.GET("/valid_email/:token", Token)
	}
	api := app.R.Group("/api")
	{
		api.GET("/swipe", Recommended)
		api.GET("/people/:param", GetPeople)
		api.GET("/", Recommended)
		api.PUT("/visit/:id", newVisit)
		api.POST("/send_token", Forgot)
		api.PUT("/reset_password", ResetPassword)
		api.PUT("/people/:id/:action", createRelation)
		api.GET("/matchs", GetMatchs)
		api.GET("/messages", GetMessages)
		api.GET("/user", UserHandler)
		api.POST("/report/:username", ReportHandler)
		api.PUT("/user/:name", UserModify)
		api.POST("/img/:n", userImageHandler)
		api.GET("/events/history/:user", getHistoryHandler)
		api.GET("/notifications/history/:user", notificationsHistoryHandler)
		api.DELETE("/notifications/:id", notificationsDeleteHandler)
		api.GET("/notifications/websocket/:user", func(c *gin.Context) {
			_ = app.M.HandleRequest(c.Writer, c.Request)
		})
		api.GET("/online/websocket/:user", func(c *gin.Context) {
			_ = app.M.HandleRequest(c.Writer, c.Request)
		})
		api.GET("/ws/:user/:suitor", func(c *gin.Context) {
			_ = app.M.HandleRequest(c.Writer, c.Request)
		})
	}
	app.M.HandleMessage(func(s *melody.Session, msg []byte) {
		app.insertMessage(msg)
		_ = app.M.BroadcastFilter(msg, func(session *melody.Session) bool {
			return session.Request.URL.Path == s.Request.URL.Path
		})
		//time.Sleep(time.Second * 1)
		newEventMessage(msg)
	})

	go app.offlineWatcher()
}

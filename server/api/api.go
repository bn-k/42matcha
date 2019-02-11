package api

import (
	"github.com/gin-gonic/gin"
)

var app = App{psql(), gin.Default()}

func RouterAPI() {
	app.r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"Purpose": "Api for matcha"})
	})
	auth := app.r.Group("/auth")
	{
		auth.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{"Purpose": "Api for authorization"})
		})
		auth.POST("login", Login)
	}
	api := app.r.Group("/api")
	{
		api.GET("/next", Next)
	}
	app.r.Run(":81")
}

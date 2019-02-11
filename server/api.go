package main

import (
	"github.com/42matcha/server/handlers"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"Purpose": "Api for matcha"})
	})
	auth := router.Group("/auth")
	{
		auth.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{"Purpose": "Api for authorization"})
		})
		auth.POST("login", handlers.Login)
	}
	api := router.Group("/api")
	{
		api.GET("/next", handlers.Next)
	}
	router.Run(":81")
}

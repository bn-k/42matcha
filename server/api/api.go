package api

import (
	"github.com/gin-gonic/gin"
)

func RouterAPI() {
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"Purpose": "Api for matcha"})
	})
	auth := router.Group("/auth")
	{
		auth.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{"Purpose": "Api for authorization"})
		})
		auth.POST("login", Login)
	}
	api := router.Group("/api")
	{
		api.GET("/next", Next)
	}
	router.Run(":81")
}

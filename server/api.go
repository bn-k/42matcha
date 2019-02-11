package main

import (
	"./handlers"
	"./middleware"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	authMiddleware := middleware.InitJwt()

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"Purpose": "Api for matcha"})
	})
	auth := router.Group("/auth")
	{
		auth.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{"Purpose": "Api for authorization"})
		})
		auth.POST("/login", authMiddleware.LoginHandler)
		auth.GET("/refresh_token", authMiddleware.RefreshHandler)
		auth.Use(authMiddleware.MiddlewareFunc())
		{
			auth.GET("/hello", handlers.Hello)
			auth.GET("/getuser", handlers.GetUser)
		}
	}
	api := router.Group("/api")
	{
		api.GET("/next", handlers.Next)
		api.GET("/curr", handlers.Curr)
	}
	router.Run(":81")
}

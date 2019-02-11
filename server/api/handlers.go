package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	form := c.PostForm("username")
	fmt.Println("form: ", form)
	c.JSON(401, gin.H{
		"login": false,
	})
}

func Next(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(200, gin.H{
		"next": "next",
	})
}

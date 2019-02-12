package api

import (
	"github.com/gin-gonic/gin"
)

const wPassword = "wrong password or username"

func Next(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(200, gin.H{
		"next": "next",
	})
}

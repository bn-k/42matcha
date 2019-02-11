package handlers

import (
	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	c.Header("Content-Type", "application/json")
}

func Next(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(200, gin.H{
		"next": "next",
	})
}

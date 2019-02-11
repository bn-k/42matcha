package handlers

import (
	"fmt"
	"github.com/42matcha/server/middleware"
	"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
	"net/http"
)

const identityKey = middleware.IdentityKey

func GetUser(c *gin.Context) {
	fmt.Println("getUserHandler")
	claims := jwt.ExtractClaims(c)
	user, _ := c.Get(identityKey)
	c.JSON(200, gin.H{
		"userID":   claims["id"],
		"username": user.(*middleware.User).UserName,
		"Purpose":  "get User res",
	})
	fmt.Println("getUserHandler Ended")
}

func Hello(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	user, _ := c.Get(identityKey)
	fmt.Println(c.Request.Header)
	c.JSON(200, gin.H{
		"userID":   claims["id"],
		"userName": user.(*middleware.User).UserName,
		"text":     "Hello World.",
	})
}

func Curr(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, nil)
}

func Next(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	fmt.Println("Header: ", c.Request.Header)
	fmt.Println("Claims: ", claims)
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, nil)
}

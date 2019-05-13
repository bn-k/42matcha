package api

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func TokenValidate(c *gin.Context) (valid bool) {
	tokenString := c.Request.Header["Authorization"][0]

	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(tokenString, &claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(HashKey), nil
	})
	if err != nil {
		c.JSON(201, gin.H{"err": err.Error()})
		return false
	} else if checkJwt(tokenString) {
		return true
	}
	return false
}

func Matching(c *gin.Context) {
	if TokenValidate(c) {
		// on Like
		// on Dislike
	}
	return
}

func LikeUser(userId int64) {

}

func DislikeUser(UserId int64) {

}

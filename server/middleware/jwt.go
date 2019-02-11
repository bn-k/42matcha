package middleware

import (
	"../model"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/fatih/color"
	"github.com/gin-gonic/gin"
	"time"
)

var key = []byte("supersecret")

func (model.User) newToken() {
	if err != nil {
		color.Magenta("Error: ")
		fmt.Println(err.Error())
	} else {
		color.Cyan("Success: ")
		fmt.Println(token)
		c.JSON(200, gin.H{
			"next":  "next",
			"token": token,
		})
	}

}

func generateJwt() (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"authorized": true,
		"username":   "Nwtype",
		"exp":        time.Now().Add(time.Minute * 30).Unix(),
	})

	tokenString, err := token.SignedString(key)
	if err != nil {
		fmt.Println("something get wrong with jwt: ", err.Error())
		return "", err
	}
	return tokenString, nil
}

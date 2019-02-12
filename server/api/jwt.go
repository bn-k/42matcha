package api

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"time"
)

var key = []byte("supersecret")

func (user User) GenerateJwt() (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"authorized": true,
		"admin": true,
		"user": user,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString(key)
	if err != nil {
		fmt.Println("something get wrong with jwt: ", err.Error())
		return "", err
	}
	return tokenString, nil
}

package api

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"time"
)

var key = []byte("supersecret")

func (User) generateJwt() (string, error) {
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

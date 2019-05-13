package api

import (
	"github.com/dgrijalva/jwt-go"
	"time"
)

var key = []byte(HashKey)

func (user User) GenerateJwt() (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"loggedIn":  true,
		"id":        user.Id,
		"email":     user.Email,
		"username":  user.Username,
		"img1":      user.Img1,
		"firstname": user.FirstName,
		"lastname":  user.LastName,
		"exp":       time.Now().Add(time.Hour * 24).Unix(),
	})
	tokenString, err := token.SignedString(key)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func checkJwt(tokenString string) bool {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(HashKey), nil
	})

	if token.Valid {
		return true
	} else if ve, ok := err.(*jwt.ValidationError); ok {
		if ve.Errors&jwt.ValidationErrorMalformed != 0 {
			return false
		} else if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
			// Token is either expired or not active yet
			return false
		} else {
			return false
		}
	} else {
		return false
	}
	return true
}

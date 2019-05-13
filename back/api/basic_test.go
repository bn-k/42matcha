package api

import (
	"github.com/dgrijalva/jwt-go"
	"testing"
)

func testParseClaims(t *testing.T) {
	tokenString := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTMyMDc3NzYsImlkIjowLCJsb2dnZWRJbiI6dHJ1ZSwidXNlcm5hbWUiOiJCTksifQ.8zXBRvkysk0SfZxjU8-ThIwo_DXUHswsr5uferPAmyc"

	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(HashKey), nil
	})
	if err != nil {

	}
}

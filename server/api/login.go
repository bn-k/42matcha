package api

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/labstack/gommon/log"
)

func loginError(err error, c *gin.Context) {
	log.Error("login Error: ", err.Error())
	c.JSON(441, gin.H{
		"username": "",
	})
}

func Login(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")

	user, err := check(username, password, c, app.Users)
	if err != nil {
		c.JSON(441, gin.H{})
	} else {
		c.JSON(200, user)
	}
}

func check(username, password string, c *gin.Context, Users []User) (User, error) {
	fmt.Println(Users)
	for _, user := range Users {
		if user.Username == username {
			if user.Password == password {
				user.Token, _ = user.GenerateJwt()
				fmt.Println(user)
				return user, nil
			} else {
				loginError(errors.New(wPassword), c)
				return User{}, errors.New("bad")
			}
		}
	}
	loginError(errors.New("username doesn't exist"), c)
	return User{}, errors.New("bad")
}

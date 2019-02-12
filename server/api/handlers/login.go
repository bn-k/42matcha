package handlers

import (
	"errors"
	"github.com/42matcha/server/api/types"
	"github.com/gin-gonic/gin"
	"github.com/labstack/gommon/log"
)

func loginError(err error, c *gin.Context) {
	log.Error("login Error: ", err.Error())
	c.JSON(401, gin.H{
		"username": "",
		"token":    false,
	})
}

func Login(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")

	app, _ := c.MustGet("app").(types.AppModel)
	user, err := check(username, password, c, app.Users)
	if err != nil {
		c.JSON(401, gin.H{})
	} else {
		c.JSON(200, user)
	}
}

func check(username, password string, c *gin.Context, Users []types.User) (types.User, error) {
	for _, user := range Users {
		if user.Username == username {
			if user.Password == password {
				return user, nil
			} else {
				loginError(errors.New(wPassword), c)
				return types.User{}, errors.New("bad")
			}
		}
	}
	loginError(errors.New("username doesn't exist"), c)
	return types.User{}, errors.New("bad")
}

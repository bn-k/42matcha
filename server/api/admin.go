package api

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/labstack/gommon/log"
)

func adminError(err error, c *gin.Context) {
	log.Error("login Error: ", err.Error())
	c.JSON(401, gin.H{
		"username": "",
		"token":    false,
	})
}

func Users(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")

	app, _ := c.MustGet("app").(App)
	admin, err := checkAdmin(username, password, c, app.Users)
	if err != nil  {
		c.JSON(401, gin.H{})
	} else {
		if !admin.Admin {
			c.JSON(401, gin.H{"Not authorized: ":"not admin"})
		}
		c.JSON(200, app.Users)
	}
}

func checkAdmin(username, password string, c *gin.Context, Users []User) (User, error) {
	for _, user := range Users {
		if user.Username == username {
			if user.Password == password {
				return user, nil
			} else {
				return User{}, errors.New("bad")
			}
		}
	}
	loginError(errors.New("username doesn't exist"), c)
	return User{}, errors.New("bad")
}

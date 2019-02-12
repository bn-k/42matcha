package api

import (
	"errors"
	"fmt"
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
	//username := c.Query("username")
	//password := c.Query("password")

	printHeader(c)
	//fmt.Println(username, password)
	testQuery(c)

	app, _ := c.MustGet("app").(App)

	//admin, err := checkAdmin(username, password, c, app.Users)
	//if err != nil  {
	//	c.JSON(401, gin.H{})
	//} else {
	//	if !admin.Admin {
	//		c.JSON(401, gin.H{"Not authorized: ":"not admin"})
	//	}
		c.JSON(200, app.Users)
	//}
}

func checkAdmin(username, password string, c *gin.Context, Users []User) (User, error) {
	fmt.Println(Users)
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

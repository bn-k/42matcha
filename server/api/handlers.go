package api

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/labstack/gommon/log"
)

func testQuery(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	fmt.Println("PostForm", c.PostForm("username"))
	fmt.Println("PostFArra", c.PostFormArray("username"))
	fmt.Println("PostFormMap", c.PostFormMap("username"))
	fmt.Println("Params", c.Params)
	fmt.Println("Param", c.Param("username"))
	fmt.Println("Query", c.Query("username"))
	fmt.Println("Req.PostForm", c.Request.PostForm)
	fmt.Println("Req.PostForm", c.Request.Proto)
}

const loginPass = "Wrong password or username."
const scanFailure = "Scan SQL failed!"

func loginError(err error, c *gin.Context) {
	log.Error("login Error: ", err.Error())
	c.JSON(401, gin.H{
		"username": "",
		"token":    false,
	})
}

func (user User) check(Id int16, trueUsername, truePassword string, c *gin.Context) bool {
	if user.Username != trueUsername || user.Password != truePassword {
		loginError(errors.New(loginPass), c)
		return false
	} else {
		return true
	}
}

func Login(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	var user User

	user.Username = c.PostForm("username")
	user.Password = c.PostForm("password")

	rows, err := app.Db.Query(`SELECT id, username, password FROM users WHERE username=$1`, user.Username)

	var trueId int16
	var trueUsername, truePassword string
	if err != nil {
		loginError(err, c)
	} else {
		for rows.Next() {
			if err := rows.Scan(&trueId, &trueUsername, &truePassword); err != nil {
				loginError(errors.New(scanFailure))
			}
		}
	}
}

func Next(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(200, gin.H{
		"next": "next",
	})
}

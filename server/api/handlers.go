package api

import (
	"encoding/json"
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

func (user User) completeLogin(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	c.JSON(200, gin.H{
		"next": "next",
	})
}

func Login(c *gin.Context) {
	var user User

	testQuery(c)

	user.Username = c.PostForm("username")
	user.Password = c.PostForm("password")

	fmt.Println("========>", user.Username)

	rows, err := app.Db.Query(`SELECT id, username, password,
firstname, lastname, created_at, random_token, img1, img2, img3, img4,
img5, biography, birthday, genre, interest, city, zip, country, latitude,
longitude, geo_allowed FROM users WHERE username=$1`, user.Username)

	var trueId int16
	var trueUsername, truePassword string
	if err != nil {
		loginError(err, c)
	} else {
		for rows.Next() {
			if err := rows.Scan(&trueId, &trueUsername, &truePassword,
				&user.FirstName, &user.LastName, &user.CreatedAtTmp,
				&user.RandomToken, &user.Images[0], &user.Images[1],
				&user.Images[2], &user.Images[3], &user.Images[4],
				&user.Biography, &user.BirthdayTmp, &user.Genre,
				&user.Interest, &user.City, &user.Zip, &user.Country,
				&user.Latitude, &user.Longitude, &user.geoAllowed); err != nil {
				loginError(errors.New(scanFailure), c)
			}
		}
		if user.check(trueId, trueUsername, truePassword, c) {
			userJson, err := json.Marshal(user)
			if err != nil {
				loginError(errors.New("userJson fail"), c)
			} else {
				fmt.Println(trueUsername, truePassword)
				fmt.Println(user)
				c.JSON(200, string(userJson))
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

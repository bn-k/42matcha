package api

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"regexp"
	"strings"
	"time"
)

const vUsers = `(:username, :email, :lastname, :firstname, :password, :random_token, :img1, :img2, :img3, :img4, :img5, :biography, :birthday, :genre, :interest, :city, :zip, :country, :latitude, :longitude, :geo_allowed, :online, :rating, :admin)`

type registerForm struct {
	Username  string `db:"username"`
	Email     string `db:"email"`
	Password  string `db:"password"`
	Confirm   string `db:"confirm"`
	Lastname  string `db:"lastname"`
	Firstname string `db:"firstname"`
	Birthday  string `db:"birthday"`
	Admin     bool   `db:"admin"`
}

func Register(c *gin.Context) {
	admin := false
	if c.PostForm("admin") == "true" {
		admin = true
	}
	rf := registerForm{
		c.PostForm("username"),
		c.PostForm("email"),
		c.PostForm("password"),
		c.PostForm("confirm"),
		c.PostForm("lastname"),
		c.PostForm("firstname"),
		c.PostForm("birthday"),
		admin,
	}
	app, _ := c.MustGet("app").(App)
	user, err := app.checkRegister(rf)
	if err != nil {
		c.JSON(401, gin.H{"err": err.Error()})
	} else {
		c.JSON(200, user)
	}
}

func parseTime(str string) (time.Time, error) {
	var re = regexp.MustCompile(`\s\((.*)\)`)
	s := re.ReplaceAllString(str, ``)
	t, err := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700", s)
	return t, err
}

func (app *App) checkRegister(rf registerForm) (User, error) {
	// here rf should not exist on DB, password must match confirm, validity of all datas.
	u := User{}
	err := app.Db.Get(&u, `SELECT * FROM users WHERE username=$1`, rf.Username)
	fmt.Println("checkRegister: >>", u.Id, "<<", err)
	if u.Id != 0 {
		return User{}, errors.New("Username or Email already exist")
	}
	return NewUser(rf), nil
}

func NewUser(rf registerForm) User {
	birthday, _ := parseTime(rf.Birthday)
	u := User{0,
		rf.Username,
		rf.Email,
		rf.Lastname,
		rf.Firstname,
		rf.Password,
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		birthday,
		"",
		"",
		"",
		"",
		"",
		0,
		0,
		false,
		false,
		0,
		false,
		"",
	}
	return u
}

func tableOf(values string) string {
	return strings.Replace(values, ":", "", 99999)
}

func (app *App) insertUser(u User) {
	var query = `INSERT INTO public.users ` + tableOf(vUsers) + ` VALUES ` + vUsers
	_, err := app.Db.NamedExec(query, u)
	if err != nil {
		log.Fatalln(err)
	} else {
		app.Users = append(app.Users, u)
	}
}

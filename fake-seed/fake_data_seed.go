package main

import (
	"../back/api"
	"fmt"
	"github.com/brianvoe/gofakeit"
	"github.com/gin-gonic/gin"
	bolt "github.com/johnnadratowski/golang-neo4j-bolt-driver"
	"gopkg.in/olahol/melody.v1"
	"strconv"
	"strings"
	"time"
)

var app App

type App struct {
	R   *gin.Engine
	Neo bolt.Conn
	M   *melody.Melody
	Db  bolt.DriverPool
}

type User struct {
	Id            int64     `json:"id" db:"id"`
	Username      string    `json:"username" db:"username"`
	Email         string    `json:"email" db:"email"`
	LastName      string    `json:"lastname" db:"lastname"`
	FirstName     string    `json:"firstname" db:"firstname"`
	Password      string    `json:"password" db:"password"`
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	RandomToken   string    `json:"random_token" db:"random_token"`
	Img1          string    `json:"img1" db:"img1"`
	Img2          string    `json:"img2" db:"img2"`
	Img3          string    `json:"img3" db:"img3"`
	Img4          string    `json:"img4" db:"img4"`
	Img5          string    `json:"img5" db:"img5"`
	Biography     string    `json:"biography" db:"biography"`
	Birthday      time.Time `json:"birthday" db:"birthday"`
	Genre         string    `json:"genre" db:"genre"`
	Interest      string    `json:"interest" db:"interest"`
	City          string    `json:"city" db:"city"`
	Zip           string    `json:"zip" db:"zip"`
	Country       string    `json:"country" db:"country"`
	Latitude      float64   `json:"latitude" db:"latitude"`
	Longitude     float64   `json:"longitude" db:"longitude"`
	GeoAllowed    bool      `json:"geo_allowed" db:"geo_allowed"`
	Online        bool      `json:"online" db:"online"`
	Rating        int       `json:"rating" db:"rating"`
	Token         string    `json:"token" db:"token"`
	AccessLvl     int       `json:"access_lvl" db:"access_lvl"`
	Tags          []string  `json:"tags" db:"tags"`
	LastConn      time.Time `json:"last_conn" db:"last_conn"`
	Ilike         bool      `json:"ilike" db:"ilike"`
	Relation      string    `json:"relation" db:"relation"`
	Distance      int       `json:"distance" db:"distance"`
	OverallRating int       `json:"overall_rating" db:"overall_rating"`
}

func arrayContain(Tab []string, str string) bool {

	if len(Tab) == 0 { return false }
	for _, s := range Tab {
		if s == str {
			return true
		}
	}
	return false
}


func newRandomMale() User {
	var f *gofakeit.PersonInfo
	max := 2
	f = gofakeit.Person()
	interest := make([]string, 3)
	interest[0] = "bi"
	interest[1] = "hetero"
	interest[2] = "homo"
	tagtab := make([]string, 2)
	for i := 0; i < max; i++ {
		str := strings.ToLower(gofakeit.Color())
		if arrayContain(tagtab, str) == false {
			tagtab[i] = str
		}
	}

	Latitude, _ := gofakeit.LatitudeInRange(42.490627, 48.264989)
	Longitude, _ := gofakeit.LongitudeInRange(-3.396493, 7.517944)
	return User{Username: gofakeit.Username(),
		Password:  api.Encrypt(api.HashKey, "'"),
		FirstName: f.FirstName,
		LastName:  f.LastName,
		Email:     gofakeit.Email(),
		Img1:      "https://randomuser.me/api/portraits/men/" + strconv.Itoa(gofakeit.Number(1, 45)) + ".jpg",
		Img2:      "https://randomuser.me/api/portraits/men/" + strconv.Itoa(gofakeit.Number(1, 45)) + ".jpg",
		Img3:      gofakeit.ImageURL(300, 300),
		Img4:      gofakeit.ImageURL(300, 300),
		Img5:      gofakeit.ImageURL(300, 300),
		Biography: gofakeit.Paragraph(1, 4, 10, " "),
		Birthday: gofakeit.DateRange(time.Date(1965, 01, 01, 00, 00, 00, 00, time.UTC),
			time.Date(2000, 01, 01, 00, 00, 00, 00, time.UTC)),
		Genre:      "male",
		Interest:   gofakeit.RandString(interest),
		AccessLvl:  2,
		Online:     gofakeit.Bool(),
		Rating:     gofakeit.Number(0, 100),
		City:       gofakeit.City(),
		Zip:        gofakeit.Zip(),
		Country:    gofakeit.Country(),
		Latitude:   Latitude,
		Longitude:  Longitude,
		GeoAllowed: gofakeit.Bool(),
		CreatedAt: gofakeit.DateRange(time.Date(1995, 01, 01, 00, 00, 00, 00, time.Local),
			time.Date(2019, 05, 25, 00, 00, 00, 00, time.Local)),
		Tags: tagtab,
		LastConn: gofakeit.DateRange(time.Date(2016, 01, 01, 00, 00, 00, 00, time.Local),
			time.Date(2019, 05, 25, 00, 00, 00, 00, time.Local)),
		Ilike:    false,
		Relation: "none",
		Distance: 0,
		OverallRating: 0,
	}
}

func newRandomFemale() User {
	Latitude, _ := gofakeit.LatitudeInRange(42.490627, 48.264989)
	Longitude, _ := gofakeit.LongitudeInRange(-3.396493, 7.517944)
	var f *gofakeit.PersonInfo
	max := 2
	f = gofakeit.Person()
	interest := make([]string, 3)
	interest[0] = "bi"
	interest[1] = "hetero"
	interest[2] = "homo"
	tagtab := make([]string, 2)
	for i := 0; i < max; i++ {
		str := strings.ToLower(gofakeit.Color())
		if arrayContain(tagtab, str) == false{
			tagtab[i] = str
		}
	}
	return User{Username: gofakeit.Username(),
		Password:  api.Encrypt(api.HashKey, "'"),
		FirstName: f.FirstName,
		LastName:  f.LastName,
		Email:     gofakeit.Email(),
		Img1:      "https://randomuser.me/api/portraits/women/" + strconv.Itoa(gofakeit.Number(1, 45)) + ".jpg",
		Img2:      "https://randomuser.me/api/portraits/women/" + strconv.Itoa(gofakeit.Number(1, 45)) + ".jpg",
		Img3:      gofakeit.ImageURL(300, 300),
		Img4:      gofakeit.ImageURL(300, 300),
		Img5:      gofakeit.ImageURL(300, 300),
		Biography: gofakeit.Paragraph(1, 4, 10, " "),
		Birthday: gofakeit.DateRange(time.Date(1965, 01, 01, 00, 00, 00, 00, time.UTC),
			time.Date(2000, 01, 01, 00, 00, 00, 00, time.UTC)),
		Genre:      "female",
		Interest:   gofakeit.RandString(interest),
		AccessLvl:  2,
		Online:     gofakeit.Bool(),
		Rating:     gofakeit.Number(0, 100),
		City:       gofakeit.City(),
		Zip:        gofakeit.Zip(),
		Country:    gofakeit.Country(),
		Latitude:   Latitude,
		Longitude:  Longitude,
		GeoAllowed: gofakeit.Bool(),
		CreatedAt: gofakeit.DateRange(time.Date(1995, 01, 01, 00, 00, 00, 00, time.Local),
			time.Date(2019, 05, 25, 00, 00, 00, 00, time.Local)),
		Tags: tagtab,
		LastConn: gofakeit.DateRange(time.Date(2016, 01, 01, 00, 00, 00, 00, time.Local),
			time.Date(2019, 05, 25, 00, 00, 00, 00, time.Local)),
		Ilike:    false,
		Relation: "none",
		Distance: 0,
		OverallRating: 0,
	}
}

func main() {
	const max = 260
	fmt.Println("-- STARTING FAKE DATA CREATION --")
	app.Db, _ = bolt.NewDriverPool("bolt://neo4j:secret@localhost:7687", 1000)
	app.Neo, _ = app.Db.OpenPool()
	defer app.Neo.Close()
	for i := 0; i < 1000; i++ {
		s := gofakeit.Color()
		s = strings.ToLower(s)
		app.Neo.QueryNeoAll(`MERGE (t:TAG {key: "`+s+`", text: "#`+strings.Title(s)+`", value: "`+s+`"}) `, nil)
	}
	for i := 0; i < max; i++ {
		u := newRandomMale()
		app.insertFakeUser(u)
		AddTagRelation(u)
		u = newRandomFemale()
		app.insertFakeUser(u)
		AddTagRelation(u)
	}
	fmt.Println("-- ENDED FAKE DATA CREATION --")
}

func AddTagRelation(u User) {
	for i := 0; i < 2; i++ {
		tag := strings.ToLower(u.Tags[i])
		q := `MATCH (u:User) WHERE u.username = {username} MATCH (n:TAG) WHERE n.value = "` + tag + `" CREATE (u)-[g:TAGGED]->(n)`
		st := app.prepareFakeStatement(q)
		api.ExecuteStatement(st, api.MapOf(u))
	}
}

func (app *App) insertFakeUser(u User) {
	q := `CREATE (u:User{name: {username},
username:{username}, password:{password},
firstname:{firstname}, lastname:{lastname},
birthday:{birthday}, random_token: {random_token},
img1:{img1}, img2: {img2},
img3:{img3}, img4: {img4},
img5:{img5}, biography: {biography},
genre:{genre}, interest: {interest},
city:{city}, zip: {zip},
country:{country}, latitude: {latitude},
longitude:{longitude}, geo_allowed: {geo_allowed},
online:{online}, rating: {rating},
email: {email}, access_lvl: {access_lvl}, last_conn: {last_conn},
ilike: {ilike}, relation: {relation}, tags: {tags}, 
distance: {distance}, overall_rating: {overall_rating}})`
	st := app.prepareFakeStatement(q)
	api.ExecuteStatement(st, api.MapOf(u))
	return
}

func (app *App) prepareFakeStatement(query string) bolt.Stmt {
	st, err := app.Neo.PrepareNeo(query)
	api.HandleError(err)
	return st
}

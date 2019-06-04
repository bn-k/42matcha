package api

import (
	"github.com/gin-gonic/gin"
	bolt "github.com/johnnadratowski/golang-neo4j-bolt-driver"
	"github.com/johnnadratowski/golang-neo4j-bolt-driver/structures/graph"
	"gopkg.in/olahol/melody.v1"
	"time"
)

var app App

type App struct {
	R   *gin.Engine
	Neo bolt.Conn
	M   *melody.Melody
	Db  bolt.DriverPool
}

type ResStart struct {
	User  User         `json:"user"`
	Dates []graph.Node `json:"dates"`
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

type Location struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type Tag struct {
	Key   string `json:"key"`
	Text  string `json:"text"`
	Value string `json:"value"`
}

type Filters struct {
	Age      []int    `json:"age"`
	Score    []int    `json:"score"`
	Location []int    `json:"location"`
	Tags     []string `json:"tags"`
}

type registerForm struct {
	Username  string    `db:"username"`
	Email     string    `db:"email"`
	Password  string    `db:"password"`
	Confirm   string    `db:"confirm"`
	Lastname  string    `db:"lastname"`
	Firstname string    `db:"firstname"`
	Birthday  time.Time `db:"birthday"`
}

type ErrorField struct {
	Status  bool   `json:"status"`
	Message string `json:"message"`
}

type validationResponse struct {
	Valid     bool       `json:"valid"`
	Fail      bool       `json:"fail"`
	Username  ErrorField `json:"username"`
	Email     ErrorField `json:"email"`
	Password  ErrorField `json:"password"`
	Confirm   ErrorField `json:"confirm"`
	Lastname  ErrorField `json:"lastname"`
	Firstname ErrorField `json:"firstname"`
	Birthday  ErrorField `json:"birthday"`
	Other     ErrorField `json:"other"`
	Type      string     `json:"type"`
}

type Match struct {
	idFrom int          `json:"id_from"`
	idTo   int          `json:"id_to"`
	action string       `json:"action"`
	c      *gin.Context `json:"c"`
}

type Notification struct {
	Message   string `json:"message"`
	Id        int64  `json:"id"`
	UserId    int64  `json:"user_id"`
	AuthorId  int64  `json:"author_id"`
	SubjectId int64  `json:"subject_id"`
}

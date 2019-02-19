package api

import (
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"gopkg.in/go-playground/validator.v9"
	"time"
)

var app App

type App struct {
	Db       *sqlx.DB
	R        *gin.Engine
	Users    []User
	validate *validator.Validate
}

type User struct {
	Id          int16     `json:"id" db:"id"`
	Username    string    `json:"username" db:"username"`
	EMail       string    `json:"e_mail" db:"email"`
	LastName    string    `json:"last_name" db:"lastname"`
	FirstName   string    `json:"first_name" db:"firstname"`
	Password    string    `json:"password" db:"password"`
	CreatedAt   string    `json:"created_at" db:"created_at"`
	RandomToken string    `json:"random_token" db:"random_token"`
	Img1        string    `json:"img1" db:"img1"`
	Img2        string    `json:"img2" db:"img2"`
	Img3        string    `json:"img3" db:"img3"`
	Img4        string    `json:"img4" db:"img4"`
	Img5        string    `json:"img5" db:"img5"`
	Biography   string    `json:"biography" db:"biography"`
	Birthday    time.Time `json:"birthday" db:"birthday"`
	Genre       string    `json:"genre" db:"genre"`
	Interest    string    `json:"interest" db:"interest"`
	City        string    `json:"city" db:"city"`
	Zip         string    `json:"zip" db:"zip"`
	Country     string    `json:"country" db:"country"`
	Latitude    float32   `json:"latitude" db:"latitude"`
	Longitude   float32   `json:"longitude" db:"longitude"`
	GeoAllowed  bool      `json:"geo_allowed" db:"geo_allowed"`
	Online      bool      `json:"online" db:"online"`
	Rating      float32   `json:"rating" db:"rating"`
	Admin       bool      `json:"admin" db:"admin"`
	Token       string    `json:"token" db:"token"`
}

type registerForm struct {
	Username  string `db:"username" validate:"required,min=6,max=20,alphanumunicode"`
	Email     string `db:"email" validate:"required,email"`
	Password  string `db:"password" validate:"required,min=6,max=32"`
	Confirm   string `db:"confirm" validate:"required, eqfield=Password"`
	Lastname  string `db:"lastname" validate:"required,min=2,max=32,alphaunicode"`
	Firstname string `db:"firstname" validate:"required,min=2,max=32,alphaunicode"`
	Birthday  string `db:"birthday" validate:"required,"`
	Admin     bool   `db:"admin"`
}

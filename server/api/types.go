package api

import (
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"time"
)

type App struct {
	Db    *sqlx.DB
	R     *gin.Engine
	Users []User
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

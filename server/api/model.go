package api

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"time"
)

type App struct {
	Db *sql.DB
	r  *gin.Engine
}

type User struct {
	Id           int16
	Username     string
	EMail        string
	LastName     string
	FirstName    string
	Password     string
	CreatedAtTmp string
	CreatedAt    time.Time
	RandomToken  string
	Images       [5]string
	Biography    string
	BirthdayTmp  time.Time
	Birthday     time.Time
	Genre        string
	Interest     string
	City         string
	Zip          string
	Country      string
	Latitude     float32
	Longitude    float32
	geoAllowed   bool
	Online       bool
	Rating       float32
}

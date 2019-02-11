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
	Id        int16
	Username  string
	FirstName string
	LastName  string
	Password  string
	EMail     string
	Images    [5]string
	Birthday  time.Time
	Login     login
}

type login struct {
	Id       int
	Username string
	Password string
}

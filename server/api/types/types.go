package types

import (
	"database/sql"
	"github.com/gin-gonic/gin"
)

type AppModel struct {
	Db    *sql.DB
	R     *gin.Engine
	Users []User
}

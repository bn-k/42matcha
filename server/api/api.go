package api

import (
	"database/sql"
	"github.com/42matcha/server/api/types"
	"github.com/gin-gonic/gin"
	"time"
)

type App struct {
	types.AppModel
}

type User struct {
	types.User
}

func newApp() *App {
	app := new(App)
	app.Db = psql()
	app.R = gin.Default()
	app.Users = make([]types.User, 0)
}

func Run() {
	app := newApp()
	go app.routerAPI()
	go app.fetchUsers()

	app.R.Run(":81")
}

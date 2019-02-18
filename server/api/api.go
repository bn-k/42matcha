package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

var app App

func (app *App) newApp() {
	app.R = gin.Default()
	app.Users = make([]User, 0)
}

func Run() {
	app.newApp()
	go app.routerAPI()
	app.Db = pSql()
	app.fetchUsers()

	fmt.Printf("Print Users: %#v", app.Users)
	app.R.Run(":81")
}

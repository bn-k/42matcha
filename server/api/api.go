package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func newApp() *App {
	app := new(App)
	app.R = gin.Default()
	app.Users = make([]User, 0)
	return app
}

func Run() {
	app := newApp()
	go app.routerAPI()
	app.Db = pSql()
	app.fetchUsers()

	fmt.Printf("Print Users: %#v", app.Users)
	app.R.Run(":81")
}

package api

import (
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
	Sql()

	app.R.Run(":81")
}

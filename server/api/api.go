package api

import (
	"github.com/gin-gonic/gin"
)

func newApp() *App {
	app := new(App)
	app.Db = psql()
	app.R = gin.Default()
	app.Users = make([]User, 0)
	return app
}

func Run() {
	app := newApp()
	go app.routerAPI()
	go app.fetchUsers()

	app.R.Run(":81")
}

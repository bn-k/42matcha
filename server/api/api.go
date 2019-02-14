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
	app.Db = pSql()
	app.fetchUsers()

	const c = "dur"
	app.insertUser(NewUser(c+"User", c+"Mail", c+"Pass", c+"Last", c+"First"))
	app.R.Run(":81")
}

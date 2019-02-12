package api

import (
	"github.com/42matcha/server/api/handlers"
	"github.com/gin-gonic/gin"
)

func apiMiddleware(app *App) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("app", *app)
		c.Next()
	}
}

func (app *App) routerAPI() {
	app.R.Use(apiMiddleware(app))
	auth := app.R.Group("/auth")
	{
		auth.POST("login", handlers.Login)
	}
	api := app.R.Group("/api")
	{
		api.GET("/next", handlers.Next)
	}
}

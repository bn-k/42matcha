package api

import (
	"github.com/gin-gonic/gin"
	bolt "github.com/johnnadratowski/golang-neo4j-bolt-driver"
	"github.com/johnnadratowski/golang-neo4j-bolt-driver/errors"
	"os"
	"time"
)

const HashKey = "5c894d411c2f7445dbadb9b6"

func (app *App) newApp() {
	app.R = gin.Default()
}

func NewConn() (bolt.Conn, error) {
	retries := 0
	for retries < 300 {
		conn, err := app.Db.OpenPool()
		if conn != nil {
			return conn, err
		}
		retries = retries + 1
		time.Sleep(15 * time.Second)
	}
	return nil, errors.New("Connection Time Out")
}

func setAppDb(host string) (err error) {
	app.Db, err = bolt.NewDriverPool("bolt://neo4j:secret@"+host+":7687", 100)
	if err != nil {
		return
	}
	return
}

func Run() {
	var err error

	app.newApp()
	host := os.Getenv("NEO_HOST")
	if err = setAppDb(host); err != nil {
		panic(err)
	}

	app.Neo, err = NewConn()
	if err != nil {
		panic(err)
	}

	defer app.Neo.Close()

	go app.routerAPI()
	app.R.Run(":8181")
}

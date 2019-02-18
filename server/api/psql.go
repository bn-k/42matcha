package api

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"log"
)

func (app *App) fetchUsers() {
	err := app.Db.Select(&app.Users, `SELECT * FROM users`)
	fmt.Println("FetchUser", err)
}

func pSql() *sqlx.DB {
	connStr := "user=postgres password=secret dbname=matcha sslmode=disable"
	db, err := sqlx.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	return db
}

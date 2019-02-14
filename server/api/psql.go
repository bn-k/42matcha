package api

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"log"
	"strings"
)

func (app *App) fetchUsers() {
	app.Db.Select(&app.Users, `SELECT * FROM public.users`)
}

const ArchivevUsers = `(:username, :email, :lastname, :firstname, :password, :created_at, :random_token, :img1, :img2, :img3, :img4, :img5, :biography, :birthday, :genre, :interest, :city, :zip, :country, :latitude, :longitude, :geo_allowed, :online, :rating, :admin)`
const vUsers = `(:username, :email, :lastname, :firstname, :password, :city, :zip, :country, :latitude, :longitude, :geo_allowed, :online, :rating, :admin)`

func tableOf(values string) string {
	return strings.Replace(values, ":", "", 99999)
}

func (app *App) insertUser(u User) {
	var query = `INSERT INTO public.users ` + tableOf(vUsers) + ` VALUES ` + vUsers

	fmt.Println(query)
	app.Db.NamedExec(query, u)
}

func pSql() *sqlx.DB {
	connStr := "user=postgres password=secret dbname=matcha sslmode=disable"
	db, err := sqlx.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	return db
}

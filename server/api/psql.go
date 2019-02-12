package api

import (
	"database/sql"
	"errors"
	"fmt"
	_ "github.com/lib/pq"
	"log"
)

func (app App) usersQuery() (sql.Rows, error) {
	rows, err := app.Db.Query(`SELECT id, username, email, password,
firstname, lastname, created_at, random_token, img1, img2, img3, img4,
img5, biography, birthday, genre, interest, city, zip, country, latitude,
longitude, geo_allowed FROM users`)
	if err != nil {
		return sql.Rows{}, err
	} else {
		return *rows, nil
	}
}

func (app *App) fetchUsers() {
	rows, err := app.usersQuery()
	var U User
	if err != nil {
		fmt.Println(errors.New("FetchUsers: users Query failed"))
	} else {
		for rows.Next() {
			if err := rows.Scan(&U.Id, &U.Username, &U.EMail, &U.Password,
				&U.FirstName, &U.LastName, &U.CreatedAtTmp,
				&U.RandomToken, &U.Images[0], &U.Images[1],
				&U.Images[2], &U.Images[3], &U.Images[4],
				&U.Biography, &U.BirthdayTmp, &U.Genre,
				&U.Interest, &U.City, &U.Zip, &U.Country,
				&U.Latitude, &U.Longitude, &U.GeoAllowed); err != nil {
				fmt.Println(errors.New("FetchUsers: queryScan failed"))
			} else {
			}
			app.Users = append(app.Users, U)
		}
	}
}

func psql() *sql.DB {
	connStr := "user=postgres password=secret dbname=matcha sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	return db
}

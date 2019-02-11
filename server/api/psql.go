package api

import (
	"database/sql"
	_ "github.com/lib/pq"
	"log"
)

func psql() *sql.DB {
	connStr := "user=postgres password=secret dbname=matcha sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	return db
}

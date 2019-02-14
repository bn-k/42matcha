package api

import (
	"database/sql"
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"log"
	"time"
)

const usersColumns = ` (id, username, email, lastname, firstname, 
password,created_at, random_token, img1, img2, img3, img4, 
img5, biography, birthday, genre, interest, city, zip, country, latitude, 
longitude, geo_allowed, online, online_status_update_date, rating, admin) `

const usersValues = ` (:id, :username, :email, :lastname, :firstname, 
:password,created_at, :random_token, :img1, :img2, :img3, :img4, 
:img5, :biography, :birthday, :genre, :interest, :city, :zip, :country, :latitude, 
:longitude, :geo_allowed, :online, :online_status_update_date, :rating, :admin) `

func (app *App) fetchUsers() {
	test := make([]User, 0)
	fmt.Println("First", test)
	app.Db.Select(&test, `SELECT FROM public.users `+usersValues)
	fmt.Println("Second", test)
	time.Sleep(time.Second * 2)
	fmt.Println("Third", test)

}

func pSql() *sqlx.DB {
	connStr := "user=postgres password=secret dbname=matcha sslmode=disable"
	db, err := sqlx.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	return db
}

const tableUsers = `
CREATE TABLE users
(
  id                        serial                not null
    constraint users_pkey
    primary key,
  username                  varchar(65)           not null,
  email                     varchar(255)          not null,
  lastname                  varchar(65)           not null,
  firstname                 varchar(65)           not null,
  password                  varchar(65)           not null,
  created_at                timestamp with time zone default CURRENT_TIMESTAMP,
  random_token              varchar(254)             default '' :: character varying,
  img1                      varchar(255)             default '' :: character varying,
  img2                      varchar(255)             default '' :: character varying,
  img3                      varchar(255)             default '' :: character varying,
  img4                      varchar(255)             default '' :: character varying,
  img5                      varchar(255)             default '' :: character varying,
  biography                 varchar(2048)            default '' :: character varying,
  birthday                  timestamp,
  genre                     varchar(64)              default 'male' :: character varying,
  interest                  varchar(255)             default 'bisexual' :: character varying,
  city                      varchar(65)              default '' :: character varying,
  zip                       varchar(65)              default '' :: character varying,
  country                   varchar(65)              default '' :: character varying,
  latitude                  numeric(20, 6)           default 0.0,
  longitude                 numeric(20, 6)           default 0.0,
  geo_allowed               boolean default false not null,
  online                    boolean default false not null,
  online_status_update_date timestamp with time zone,
  rating                    numeric(9, 6)            default 2.5,
  admin                     boolean                  default false
);
`

var schema = `
CREATE TABLE person (
    first_name text,
    last_name text,
    email text
);



CREATE TABLE place (
    country text,
    city text NULL,
    telcode integer
)`

type Person struct {
	FirstName string `db:"first_name"`
	LastName  string `db:"last_name"`
	Email     string
}

type Place struct {
	Country string
	City    sql.NullString
	TelCode int
}

func Sql() {
	// this Pings the database trying to connect, panics on error
	// use sqlx.Open() for sql.Open() semantics
	db, err := sqlx.Connect("postgres", "user=postgres password=secret dbname=matcha sslmode=disable")
	if err != nil {
		log.Fatalln(err)
	}

	// exec the schema or fail; multi-statement Exec behavior varies between
	// database drivers;  pq will exec them all, sqlite3 won't, ymmv
	//db.MustExec(tableUsers)

	//tx := db.MustBegin()
	//tx.MustExec("INSERT INTO person (first_name, last_name, email) VALUES ($1, $2, $3)", "Jason", "Moiron", "jmoiron@jmoiron.net")
	//tx.MustExec("INSERT INTO person (first_name, last_name, email) VALUES ($1, $2, $3)", "John", "Doe", "johndoeDNE@gmail.net")
	//tx.MustExec("INSERT INTO place (country, city, telcode) VALUES ($1, $2, $3)", "United States", "New York", "1")
	//tx.MustExec("INSERT INTO place (country, telcode) VALUES ($1, $2)", "Hong Kong", "852")
	//tx.MustExec("INSERT INTO place (country, telcode) VALUES ($1, $2)", "Singapore", "65")
	//// Named queries can use structs, so if you have an existing struct (i.e. person := &Person{}) that you have populated, you can pass it in as &person
	//tx.NamedExec("INSERT INTO person (first_name, last_name, email) VALUES (:first_name, :last_name, :email)", &Person{"Jane", "Citizen", "jane.citzen@example.com"})
	//tx.Commit()

	// Query the database, storing results in a []Person (wrapped in []interface{})
	people := []Person{}
	db.Select(&people, "SELECT * FROM person ORDER BY first_name ASC")
	jason, john := people[0], people[1]

	fmt.Printf("%#v\n%#v", jason, john)
	// Person{FirstName:"Jason", LastName:"Moiron", Email:"jmoiron@jmoiron.net"}
	// Person{FirstName:"John", LastName:"Doe", Email:"johndoeDNE@gmail.net"}

	// You can also get a single result, a la QueryRow
	jason = Person{}
	err = db.Get(&jason, "SELECT * FROM person WHERE first_name=$1", "Jason")
	fmt.Printf("%#v\n", jason)
	// Person{FirstName:"Jason", LastName:"Moiron", Email:"jmoiron@jmoiron.net"}

	// if you have null fields and use SELECT *, you must use sql.Null* in your struct
	places := []Place{}
	err = db.Select(&places, "SELECT * FROM place ORDER BY telcode ASC")
	if err != nil {
		fmt.Println(err)
		return
	}
	usa, singsing, honkers := places[0], places[1], places[2]

	fmt.Printf("%#v\n%#v\n%#v\n", usa, singsing, honkers)
	// Place{Country:"United States", City:sql.NullString{String:"New York", Valid:true}, TelCode:1}
	// Place{Country:"Singapore", City:sql.NullString{String:"", Valid:false}, TelCode:65}
	// Place{Country:"Hong Kong", City:sql.NullString{String:"", Valid:false}, TelCode:852}

	// Loop through rows using only one struct
	place := Place{}
	rows, err := db.Queryx("SELECT * FROM place")
	for rows.Next() {
		err := rows.StructScan(&place)
		if err != nil {
			log.Fatalln(err)
		}
		fmt.Printf("%#v\n", place)
	}
	// Place{Country:"United States", City:sql.NullString{String:"New York", Valid:true}, TelCode:1}
	// Place{Country:"Hong Kong", City:sql.NullString{String:"", Valid:false}, TelCode:852}
	// Place{Country:"Singapore", City:sql.NullString{String:"", Valid:false}, TelCode:65}

	// Named queries, using `:name` as the bindvar.  Automatic bindvar support
	// which takes into account the dbtype based on the driverName on sqlx.Open/Connect
	_, err = db.NamedExec(`INSERT INTO person (first_name,last_name,email) VALUES (:first,:last,:email)`,
		map[string]interface{}{
			"first": "Bin",
			"last":  "Smuth",
			"email": "bensmith@allblacks.nz",
		})

	// Selects Mr. Smith from the database
	rows, err = db.NamedQuery(`SELECT * FROM person WHERE first_name=:fn`, map[string]interface{}{"fn": "Bin"})

	// Named queries can also use structs.  Their bind names follow the same rules
	// as the name -> db mapping, so struct fields are lowercased and the `db` tag
	// is taken into consideration.
	rows, err = db.NamedQuery(`SELECT * FROM person WHERE first_name=:first_name`, jason)
}

package api

import (
	bolt "github.com/johnnadratowski/golang-neo4j-bolt-driver"
	"os"
	"testing"
)

func TestWebSocket(t *testing.T) {
	driver := bolt.NewDriver()
	host := os.Getenv("NEO_HOST")
	app.Neo, _ = driver.OpenNeo("bolt://neo4j:secret@" + host + ":7687")
}

func TestCreateLike(t *testing.T) {

	var M Match
	M.idFrom = 201
	M.idTo = 6
	M.action = "LIKE"
	if valid, err := app.dbMatchs(M); valid != true || err != nil {
	}

}

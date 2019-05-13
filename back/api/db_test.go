package api

import (
	bolt "github.com/johnnadratowski/golang-neo4j-bolt-driver"
	"os"
	"testing"
)

func TestGlobal(t *testing.T) {
	driver := bolt.NewDriver()
	host := os.Getenv("NEO_HOST")
	app.Neo, _ = driver.OpenNeo("bolt://neo4j:secret@" + host + ":7687")

}

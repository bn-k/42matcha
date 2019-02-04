package dbmongo

import "gopkg.in/mgo.v2"

var MgoSession *mgo.Session

func Init() {
	session, err  := mgo.Dial("localhost")
	if err != nil {
		panic("Init err")
		panic(err)
	}
	MgoSession = session
}

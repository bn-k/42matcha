package controller

import "time"

type User struct {
	username  string
	firstName string
	lastName  string
	eMail     string
	images    [5]string
	birthday  time.Time
}

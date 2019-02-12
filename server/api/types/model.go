package types

import "time"

type User struct {
	Id           int16     `json:"id"`
	Username     string    `json:"username"`
	EMail        string    `json:"e_mail"`
	LastName     string    `json:"last_name"`
	FirstName    string    `json:"first_name"`
	Password     string    `json:"password"`
	CreatedAtTmp string    `json:"created_at_tmp"`
	CreatedAt    time.Time `json:"created_at"`
	RandomToken  string    `json:"random_token"`
	Images       [5]string `json:"images"`
	Biography    string    `json:"biography"`
	BirthdayTmp  time.Time `json:"birthday_tmp"`
	Birthday     time.Time `json:"birthday"`
	Genre        string    `json:"genre"`
	Interest     string    `json:"interest"`
	City         string    `json:"city"`
	Zip          string    `json:"zip"`
	Country      string    `json:"country"`
	Latitude     float32   `json:"latitude"`
	Longitude    float32   `json:"longitude"`
	GeoAllowed   bool      `json:"geo_allowed"`
	Online       bool      `json:"online"`
	Rating       float32   `json:"rating"`
}

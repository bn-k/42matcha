package api

import "os"

var (
	imageSrc = os.Getenv("IMAGE_SRC") + "/"
)

const (
	imageHost    = "http://localhost:3000"
	like         = "LIKE"
	dislike      = "DISLIKE"
	matched      = "MATCHED"
	delayWatcher = 10
)

package main

import (
	"fmt"
	"time"
	_ "github.com/Newcratie/matcha-api"
)

func main() {
	fmt.Println("API launched!!")
	//api.Run()
	time.Sleep(time.Hour * 4)
}

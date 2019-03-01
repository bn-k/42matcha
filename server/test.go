package main

import (
"fmt"
"time"
"github.com/Newcratie/matcha-api"
)

func main() {
fmt.Println("API launched!!")
api.Run()
time.Sleep(time.Hour * 4)
}

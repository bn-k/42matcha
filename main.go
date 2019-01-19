package main

import (
	"fmt"
	"net/http"

	//"net/http"
	//"fmt"
	"html/template"
	"time"
)

type Welcome struct {
	Name string
	Time string
}

func main() {
	welcome := Welcome{"Anonymous", time.Now().Format(time.Stamp)}
	templates := template.Must(template.ParseFiles("template/welcome.html"))
	fmt.Println("welcome and templates: ", welcome, templates)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("img"))))
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		if name := request.FormValue("name"); name != "" {
			welcome.Name = name
		}

		if err := templates.ExecuteTemplate(writer, "welcome.html", welcome); err != nil {
			http.Error(writer, err.Error(), http.StatusInternalServerError)
		}
	})
	fmt.Println("listening...")
	go fmt.Println(http.ListenAndServe(":80", nil))
}

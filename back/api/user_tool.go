package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"unicode"
)

func verifyPassword(newPassword string, confirmPassword string) error {
	var uppercasePresent bool
	var lowercasePresent bool
	var numberPresent bool
	var specialCharPresent bool
	const minPassLength = 8
	const maxPassLength = 64
	var passLen int
	var errorString string

	for _, ch := range newPassword {
		switch {
		case unicode.IsNumber(ch):
			numberPresent = true
			passLen++
		case unicode.IsUpper(ch):
			uppercasePresent = true
			passLen++
		case unicode.IsLower(ch):
			lowercasePresent = true
			passLen++
		case unicode.IsPunct(ch) || unicode.IsSymbol(ch):
			specialCharPresent = true
			passLen++
		case ch == ' ':
			passLen++
		}
	}

	appendError := func(err string) {
		if len(strings.TrimSpace(errorString)) != 0 {
			errorString += ", " + err
		} else {
			errorString = err
		}
	}
	if newPassword != confirmPassword {
		appendError("Password doesn't match")
	}
	if !lowercasePresent {
		appendError("Lowercase letter missing")
	}
	if !uppercasePresent {
		appendError("Uppercase letter missing")
	}
	if !numberPresent {
		appendError("At least one numeric character required")
	}
	if !specialCharPresent {
		appendError("Special character missing")
	}
	if !(minPassLength <= passLen && passLen <= maxPassLength) {
		appendError(fmt.Sprintf("Password length must be between %d to %d characters long", minPassLength, maxPassLength))
	}

	if len(errorString) != 0 {
		return fmt.Errorf(errorString)
	}
	return nil
}

func getJson(url string, target interface{}) {
	r, _ := http.Get(url)

	defer r.Body.Close()

	bd, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(bd, target)
}

func getPositionFromIp(Ip string) (Latitude, longitude float64) {
	var pos Location
	url := "http://api.ipstack.com/" + Ip + "?access_key=12895141d055409cac451e1a526764a7&format=1"
	getJson(url, &pos)
	return pos.Latitude, pos.Longitude
}

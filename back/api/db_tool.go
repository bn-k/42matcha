package api

import (
	"fmt"
	"github.com/johnnadratowski/golang-neo4j-bolt-driver/structures/graph"
	"math"
	"reflect"
	"strconv"
	"time"
)

func UpdateRating(Id int, Relation string) {

	switch Relation {
	case "LIKE":
		q := `MATCH (n:User) WHERE ID(n)= ` + strconv.Itoa(Id) + ` SET n.rating = n.rating + 1`
		app.Neo.QueryNeoAll(q, nil)
		break
	case "DISLIKE":
		q := `MATCH (n:User) WHERE ID(n)= ` + strconv.Itoa(Id) + ` SET n.rating = n.rating - 1`
		app.Neo.QueryNeoAll(q, nil)
		break
	case "MATCHED":
		q := `MATCH (n:User) WHERE ID(n)= ` + strconv.Itoa(Id) + ` SET n.rating = n.rating + 2`
		app.Neo.QueryNeoAll(q, nil)
		break
	case "BLOCK":
		q := `MATCH (n:User) WHERE ID(n)= ` + strconv.Itoa(Id) + ` SET n.rating = n.rating - 2`
		app.Neo.QueryNeoAll(q, nil)
		break
	}
	return
}

func interfaceToStringTab(inter []interface{}) []string {

	tagA := make([]string, len(inter))
	for i, v := range inter {
		tagA[i] = v.(string)
	}
	return tagA
}

func bestScore(g graph.Node, h graph.Node, u User) bool {

	var score1 = 0
	var score2 = 0

	tagG := interfaceToStringTab(g.Properties["tags"].([]interface{}))
	tagH := interfaceToStringTab(h.Properties["tags"].([]interface{}))

	if g.Properties["distance"].(int) < h.Properties["distance"].(int) {
		score1++
	} else {
		score2++
	}

	if g.Properties["rating"].(float64) > h.Properties["rating"].(float64) {
		score1++
	} else {
		score2++
	}

	for _, res := range u.Tags {
		for _, resG := range tagG {
			if resG == res {
				score1++
			}
		}
		for _, resH := range tagH {
			if resH == res {
				score2++
			}
		}
	}

	parsedG, _ := time.Parse(time.RFC3339Nano, g.Properties["birthday"].(string))
	parsedH, _ := time.Parse(time.RFC3339Nano, h.Properties["birthday"].(string))
	ageU := Age(u.Birthday)
	ageG := absInt(ageU - Age(parsedG))
	ageH := absInt(ageU - Age(parsedH))

	if ageG < ageH {
		score1++
	} else if ageG > ageH {
		score2++
	}

	fmt.Println()
	return score1 > score2

}

func absInt(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func AgeAt(birthDate time.Time, now time.Time) int {
	years := now.Year() - birthDate.Year()

	birthDay := getAdjustedBirthDay(birthDate, now)
	if now.YearDay() < birthDay {
		years -= 1
	}

	return years
}

func Age(birthDate time.Time) int {
	return AgeAt(birthDate, time.Now())
}

func getAdjustedBirthDay(birthDate time.Time, now time.Time) int {
	birthDay := birthDate.YearDay()
	currentDay := now.YearDay()
	if isLeap(birthDate) && !isLeap(now) && birthDay >= 60 {
		return birthDay - 1
	}
	if isLeap(now) && !isLeap(birthDate) && currentDay >= 60 {
		return birthDay + 1
	}
	return birthDay
}

func isLeap(date time.Time) bool {
	year := date.Year()
	if year%400 == 0 {
		return true
	} else if year%100 == 0 {
		return false
	} else if year%4 == 0 {
		return true
	}
	return false
}

func interestQuery(Interest string, Genre string) (Query string) {

	var InvGenre string

	if Genre == "male" {
		InvGenre = "female"
	} else {
		InvGenre = "male"
	}

	switch Interest {
	case "bi":
		return `((n.interest = "hetero" AND n.genre = "` + InvGenre + `") OR (n.interest = "homo" AND n.genre = "` + Genre + `") OR (n.interest = "bi"))`
	case "hetero":
		return `(n.interest = "hetero" OR n.interest = "bi") AND n.genre = "` + InvGenre + `"`
	case "homo":
		return `(n.interest = "homo" OR n.interest = "bi") AND n.genre = "` + Genre + `"`
	}
	return ""
}

func setInterest(PeopleGenre string, PeopleInterest string, Id int) (valid bool) {

	u, _ := app.getUser(Id, "")

	switch u.Interest {
	case "bi":
		switch PeopleInterest {
		case "hetero":
			if PeopleGenre == u.Genre {
				return false
			}
			break
		case "homo":
			if PeopleGenre != u.Genre {
				return false
			}
			break
		}
		return true
	case "hetero":
		switch PeopleInterest {
		case "homo":
			return false
		case "bi":
			if PeopleGenre == u.Genre {
				return false
			}
			break
		case "hetero":
			if PeopleGenre == u.Genre {
				return false
			}
			break
		}
		break
	case "homo":
		switch PeopleInterest {
		case "hetero":
			return false
		case "bi":
			if PeopleGenre != u.Genre {
				return false
			}
			break
		case "homo":
			if PeopleGenre != u.Genre {
				return false
			}
			break
		}
		break
	}
	return true
}

func customQuery(Id int, Filter *Filters) (superQuery string) {
	var tagQuery string

	minAge := ageConvert(Filter.Age[0])
	maxAge := ageConvert(Filter.Age[1])

	if len(Filter.Tags) > 0 {
		tagQuery = setTagQuery(Filter)
	}

	superQuery += `MATCH (u:User) WHERE NOT Id(u)= ` + strconv.Itoa(Id) + ` AND NOT (u)<-[:BLOCK]-() AND (u.rating >= ` + strconv.Itoa(Filter.Score[0]) + ` AND u.rating <= ` + strconv.Itoa(Filter.Score[1]) + `)
	AND (u.birthday >= "` + maxAge + `" AND u.birthday <= "` + minAge + `") ` + tagQuery + ` RETURN DISTINCT u`
	fmt.Println("SUPERQUERY ==> ", superQuery, "|")
	return
}

func arrayContain(Tab []string, str string) bool {
	if len(Tab) == 0 {
		return false
	}
	for _, s := range Tab {
		if s == str {
			return true
		}
	}
	return false
}

func setTagQuery(Filter *Filters) (customQuery string) {

	customQuery = `MATCH (u:User) WHERE '`
	for i, tag := range Filter.Tags {
		if i == 0 {
			customQuery += tag + `' IN u.tags`
		} else {
			customQuery += ` AND '` + tag + `' IN u.tags`
		}
	}
	return
}

func ageConvert(Age int) (birthYear string) {

	now := time.Now()
	now = now.AddDate(-(Age), 0, 0)
	birthYear = now.Format(time.RFC3339Nano)
	return birthYear
}

func Haversine(lonFrom float64, latFrom float64, lonTo float64, latTo float64) (distance int) {

	const earthRadius = float64(6371)

	var deltaLat = (latTo - latFrom) * (math.Pi / 180)
	var deltaLon = (lonTo - lonFrom) * (math.Pi / 180)

	var a = math.Sin(deltaLat/2)*math.Sin(deltaLat/2) +
		math.Cos(latFrom*(math.Pi/180))*math.Cos(latTo*(math.Pi/180))*
			math.Sin(deltaLon/2)*math.Sin(deltaLon/2)
	var c = 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))

	distance = int(earthRadius * c)

	return
}

var floatType = reflect.TypeOf(float64(0))

func getFloat(unk interface{}) (float64, error) {
	v := reflect.ValueOf(unk)
	v = reflect.Indirect(v)
	if !v.Type().ConvertibleTo(floatType) {
		return 0, fmt.Errorf("cannot convert %v to float64", v.Type())
	}
	fv := v.Convert(floatType)
	return fv.Float(), nil
}

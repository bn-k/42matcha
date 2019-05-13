package api

import (
	"fmt"
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
	var cQuery string

	minAge := ageConvert(Filter.Age[0])
	maxAge := ageConvert(Filter.Age[1])

	if len(Filter.Tags) > 0 {
		cQuery = setTagQuery(Filter)
	}

	superQuery += `MATCH (u:User) WHERE NOT Id(u)= ` + strconv.Itoa(Id) + ` AND NOT (u)<-[:BLOCK]-() AND (u.rating >= ` + strconv.Itoa(Filter.Score[0]) + ` AND u.rating <= ` + strconv.Itoa(Filter.Score[1]) + `)
	AND (u.birthday >= "` + maxAge + `" AND u.birthday <= "` + minAge + `") ` + cQuery + ` RETURN DISTINCT u`
	//prin("SUPERQUERY ==> ", superQuery, "|")
	return
}

func setTagQuery(Filter *Filters) (customQuery string) {

	customQuery = `MATCH (t:TAG)-[]-(u) WHERE `
	for i, tag := range Filter.Tags {
		if i == 0 {
			customQuery += `t.value='` + tag + `' `
		} else {
			customQuery += `OR t.value='` + tag + `' `
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

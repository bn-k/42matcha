package api

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"io"
	"os"
	"strconv"
	"strings"
	"time"
)

type Request struct {
	context *gin.Context
	claims  jwt.MapClaims
	user    User
	body    map[string]interface{}
	id      int
}

func UserModify(c *gin.Context) {
	var req Request
	if err := req.prepareRequest(c); err != nil {
		c.JSON(201, gin.H{"err": err.Error()})
	} else {
		UpdateLastConn(req.id)
		req.body = getBodyToMap(c)
		req.user, _ = app.getUser(req.id, "")
		mod := c.Param("name")
		switch mod {
		case "birthday":
			req.updateBirthday()
			break
		case "position":
			req.updatePosition()
			break
		case "location":
			req.updateLocation()
			break
		case "biography":
			req.updateBio()
			break
		case "username":
			req.updateUsername()
			break
		case "usertags":
			req.userSetOldTags()
			break
		case "tag":
			req.addNewTag()
			break
		case "password":
			req.updatePassword()
			break
		case "firstname":
			req.updateFirstname()
			break
		case "lastname":
			req.updateLastname()
			break
		case "genre":
			req.updateGenre()
			break
		case "email":
			req.updateEmail()
			break
		case "interest":
			req.updateInterest()
			break
		default:
			c.JSON(202, gin.H{"err": "route not found"})
		}
	}
}

func (req Request) updatePosition() {

	if req.body["type"] == "ip" {
		req.user.Latitude, req.user.Longitude = getPositionFromIp(req.body["position"].(string))
		app.updateUser(req.user)
	} else if req.body["type"] == "gps" {
		req.user.Latitude = req.body["position"].(map[string]interface{})["lat"].(float64)
		req.user.Longitude = req.body["position"].(map[string]interface{})["long"].(float64)
		app.updateUser(req.user)
	} else {
		err := errors.New("error : Can't update user position")
		req.context.JSON(201, gin.H{"err": err.Error()})
	}
	retUser(req)
}
func (req Request) updateLocation() {
	if req.body["position"] == nil {
		err := errors.New("error : The form is empty")
		req.context.JSON(201, gin.H{"err": err.Error()})
	}

	pos := req.body["position"]
	req.user.Latitude = pos.(map[string]interface{})["Latitude"].(float64)
	req.user.Longitude = pos.(map[string]interface{})["Longitude"].(float64)
	app.updateUser(req.user)
	retUser(req)
}
func (req Request) updateBirthday() {
	if req.body["day"] == nil {
		err := errors.New("error : The form is empty")
		req.context.JSON(201, gin.H{"err": err.Error()})
	}
	if req.body["month"] == nil {
		err := errors.New("error : The form is empty")
		req.context.JSON(201, gin.H{"err": err.Error()})
	}
	if req.body["year"] == nil {
		err := errors.New("error : The form is empty")
		req.context.JSON(201, gin.H{"err": err.Error()})
	}
	day := strconv.FormatInt(int64(req.body["day"].(float64)), 10)
	month := strconv.FormatInt(int64(req.body["month"].(float64)), 10)
	year := strconv.FormatInt(int64(req.body["year"].(float64)), 10)
	if len(day) == 1 {
		day = "0" + day
	}
	if len(month) == 1 {
		month = "0" + month
	}
	s := year + "-" + month + "-" + day
	date, _ := time.Parse("2006-01-02", s)

	req.user.Birthday = date
	app.updateUser(req.user)
	retUser(req)
}

func (req Request) updateBio() {
	if req.body["biography"] == nil {
		err := errors.New("error : The form is empty")
		req.context.JSON(201, gin.H{"err": err.Error()})
	}
	bio := req.body["biography"].(string)
	if len(bio) > 250 || len(bio) < 10 {
		err := errors.New("error : your biography must be between 10 and 250 characters")
		req.context.JSON(201, gin.H{"err": err.Error()})
	} else {
		req.user.Biography = bio
		app.updateUser(req.user)
		retUser(req)
	}
}

func (req Request) checkPassword() error {
	if req.body["old_password"] == nil {
		err := errors.New("error : The form is empty")
		req.context.JSON(201, gin.H{"err": err.Error()})
	}
	pass := req.body["old_password"].(string)
	truePass := Decrypt(HashKey, req.user.Password)
	if pass != truePass {
		return errors.New("Wrong password")
	} else {
		return nil
	}
}

func (req Request) updateUsername() {
	if req.body["new_username"] == nil {
		err := errors.New("error : The form is empty")
		req.context.JSON(201, gin.H{"err": err.Error()})
	}
	newUsername := req.body["new_username"].(string)
	if err := req.checkPassword(); err != nil {
		req.context.JSON(201, gin.H{"err": err.Error()})
	} else if len(newUsername) < 6 || len(newUsername) > 20 {
		err = errors.New("error : your username must be between 6 to 20 characters")
		req.context.JSON(201, gin.H{"err": err.Error()})
	} else {
		req.user.Username = newUsername
		app.updateUser(req.user)
		retUser(req)
	}
}

func (req Request) updateGenre() {
	if req.body["genre"] == nil {
		err := errors.New("error : The form is empty")
		req.context.JSON(201, gin.H{"err": err.Error()})
	}
	genre := req.body["genre"].(string)
	req.user.Genre = genre
	app.updateUser(req.user)
	retUser(req)
}

func (req Request) updateInterest() {
	if req.body["interest"] == nil {
		err := errors.New("error : Your selection is empty")
		req.context.JSON(201, gin.H{"err": err.Error()})
	}
	interest := req.body["interest"].(string)
	req.user.Interest = interest
	app.updateUser(req.user)
	retUser(req)
}

func (req Request) addNewTag() {
	var Tags Tag
	if req.body["tag"] == nil {
		err := errors.New("error : The form is empty")
		req.context.JSON(201, gin.H{"err": err.Error()})
	}

	Tags.Value = req.body["tag"].(string)
	if len(Tags.Value) < 1 || len(Tags.Value) > 20 {
		err := errors.New("error : your Tag must be between 1 to 20 characters")
		req.context.JSON(201, gin.H{"err": err.Error()})
	} else if app.tagExist(Tags.Value) == true {
		err := errors.New("error : The tag exist")
		req.context.JSON(201, gin.H{"err": err.Error()})
	} else {
		Tags.Value = strings.ToLower(Tags.Value)
		Tags.Key = Tags.Value
		Tags.Text = "#" + strings.Title(Tags.Value)
		app.insertTag(Tags, req.user.Id)
	}
	req.user.Tags = append(req.user.Tags, Tags.Value)
	app.updateUser(req.user)
	retUser(req)
}

func (req Request) userSetOldTags() {
	tab := req.body["tags"].([]interface{})
	var userTags []string
	for _, tag := range tab {
		if app.tagExist(tag.(string)) && app.tagRelationExist(int(req.user.Id), tag.(string)) == false {
			userTags = append(userTags, tag.(string))
			app.createTagRelation(int(req.user.Id), tag.(string))
		}
	}
	req.user.Tags = append(req.user.Tags, userTags...)
	app.updateUser(req.user)
	retUser(req)
}

func (req Request) updateEmail() {
	newEmail := req.body["new_email"].(string)
	message := "Your mail address has been updated."
	if err := req.checkPassword(); err != nil {
		req.context.JSON(201, gin.H{"err": err.Error()})
	} else if !emailIsValid(newEmail) {
		req.context.JSON(201, gin.H{"err": "Email is invalid"})
	} else if app.emailExist(newEmail) {
		req.context.JSON(201, gin.H{"err": "Email already  exist"})
	} else {
		req.user.Email = newEmail
		app.updateUser(req.user)
		SendEmail("Email Update", req.user.Username, newEmail, message)
		retUser(req)
	}
}

func (req Request) updatePassword() {
	newPassword := req.body["new_password"].(string)
	confirmPassword := req.body["confirm"].(string)

	message := "Your password has been updated."
	if err := req.checkPassword(); err != nil {
		req.context.JSON(201, gin.H{"err": err.Error()})
	} else {
		if err = verifyPassword(newPassword, confirmPassword); err != nil {
			req.context.JSON(201, gin.H{"err": err.Error()})
		} else {
			req.user.Password = Encrypt(HashKey, newPassword)
			app.updateUser(req.user)
			SendEmail("Email Update", req.user.Username, req.user.Email, message)
			retUser(req)
		}
	}
}

func (req Request) updateFirstname() {
	firstname := req.body["firstname"].(string)
	if len(firstname) < 2 || len(firstname) > 20 {
		req.context.JSON(201, gin.H{"err": "error : your firstname must be between 2 to 20 characters"})
	} else {
		req.user.FirstName = firstname
		app.updateUser(req.user)
		retUser(req)
	}
}

func (req Request) updateLastname() {
	lastname := req.body["lastname"].(string)
	if len(lastname) < 2 || len(lastname) > 20 {
		err := errors.New("error : your lastname must be between 2 to 20 characters")
		req.context.JSON(201, gin.H{"err": err.Error()})
	} else {
		req.user.LastName = lastname
		app.updateUser(req.user)
		retUser(req)
	}
}

var magicTable = map[string]string{
	"\xff\xd8\xff":      "jpg",
	"\x89PNG\r\n\x1a\n": "png",
	"GIF87a":            "gif",
	"GIF89a":            "gif",
}

func extFromIncipit(incipit []byte) (string, error) {
	incipitStr := []byte(incipit)
	for magic, mime := range magicTable {
		if strings.HasPrefix(string(incipitStr), magic) {
			return mime, nil
		}
	}

	return "", errors.New("Wrong file")
}

func userImageHandler(c *gin.Context) {
	mFile, _ := c.FormFile("file")                // Get Multipart Header
	file, _ := mFile.Open()                       // Create Reader
	buf := bytes.NewBuffer(nil)                   // Init buffer
	if _, err := io.Copy(buf, file); err != nil { // Read file
		c.JSON(201, gin.H{"err": err.Error()})
	} else {
		name := newToken() // Generate random Name
		ext, err := extFromIncipit(buf.Bytes())
		link := imageHost + "/" + name + "." + ext
		fmt.Println("LINK =======> ", link)
		if err != nil {
			c.JSON(201, gin.H{"err": err.Error()})
		} else {
			path := imageSrc + name + "." + ext
			fmt.Println("Path =======> ", path)
			f, _ := os.Create(path) //create file
			defer f.Close()         //close after processing

			f.Write(buf.Bytes()) // Write buffer on the file

			claims := jwt.MapClaims{}
			valid, err := ValidateToken(c, &claims)

			if valid != true {
				c.JSON(201, gin.H{"err": err.Error()})
			} else {
				var req Request
				if err := req.prepareRequest(c); err != nil {
					c.JSON(201, gin.H{"err": err.Error()})
				} else {
					switch c.Param("n") {
					case "img1":
						req.user.Img1 = link
						break
					case "img2":
						req.user.Img2 = link
						break
					case "img3":
						req.user.Img3 = link
						break
					case "img4":
						req.user.Img4 = link
						break
					case "img5":
						req.user.Img5 = link
						break
					}
					app.updateUser(req.user)
					retUser(req)
				}
			}
		}
	}
}

func getBodyToMap(c *gin.Context) (body map[string]interface{}) {
	r, _ := c.GetRawData()
	err := json.Unmarshal(r, &body)
	if err != nil {
		panic(err)
	}
	return
}

func (req *Request) prepareRequest(c *gin.Context) error {
	req.context = c
	req.claims = jwt.MapClaims{}
	valid, err := ValidateToken(c, &req.claims)
	if valid == true {
		req.id = int(req.claims["id"].(float64))
		req.user, _ = app.getUser(req.id, "")
	} else {
		return err
	}
	return nil
}

func UserHandler(c *gin.Context) {
	var req Request
	if err := req.prepareRequest(c); err != nil {
		c.JSON(201, gin.H{"err": err.Error()})
	}
	retUser(req)
}

func retUser(req Request) {
	g, err := app.dbGetUserProfile(req.id)
	tagList := app.dbGetTagList()
	userTags := app.dbGetUserTags(req.user.Username)
	if err != nil {
		req.context.JSON(201, gin.H{"err": err.Error()})
	} else {
		UpdateLastConn(req.id)
		req.context.JSON(200, gin.H{"user": g, "tagList": tagList, "userTags": userTags})
	}
}

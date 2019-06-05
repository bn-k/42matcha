package api

import (
	"crypto/rand"
	"fmt"
	"regexp"
	"strconv"
	"time"
)

const (
	min     = 2
	max     = 20
	passMin = 6
	passMax = 30
)

func validateUser(rf registerForm) (User, validationResponse) {
	res := validationResponse{
		true,
		false,
		ErrorField{true, ""},
		ErrorField{true, ""},
		ErrorField{true, ""},
		ErrorField{true, ""},
		ErrorField{true, ""},
		ErrorField{true, ""},
		ErrorField{true, ""},
		ErrorField{true, ""},
		"REGISTER",
	}
	if app.usernameExist(rf.Username) {
		res.failure()
		res.Username.Status = false
		res.Username.Message = res.Username.Message + "Username already exist\n"
	}
	if app.emailExist(rf.Email) {
		res.failure()
		res.Email.Status = false
		res.Email.Message = res.Email.Message + "Email already exist\n"
	}
	if err := verifyPassword(rf.Password, rf.Confirm); err != nil {
		res.failure()
		res.Password.Status = false
		res.Password.Message = err.Error()
	}
	if !emailIsValid(rf.Email) {
		res.failure()
		res.Email.Status = false
		res.Email.Message = "Invalid Email\n"
	}
	if len(rf.Username) < min || len(rf.Username) > max {
		res.failure()
		res.Username.Status = false
		res.Username.Message = "Username must contain between " + strconv.Itoa(min) + " and " + strconv.Itoa(max) + " characters\n"
	}
	if len(rf.Lastname) < min || len(rf.Lastname) > max {
		res.failure()
		res.Lastname.Message = "Lastname must contain between " + strconv.Itoa(min) + " and " + strconv.Itoa(max) + " characters\n"
		res.Lastname.Status = false
	}
	if len(rf.Firstname) < min || len(rf.Firstname) > max {
		res.failure()
		res.Firstname.Status = false
		res.Firstname.Message = "Firstname must contain between " + strconv.Itoa(min) + " and " + strconv.Itoa(max) + " characters\n"
	}
	if res.Valid {
		u, err := userFactory(rf)
		if err != nil {
			res.failure()
		}
		return u, res
	}
	return User{}, res
}

func userFactory(rf registerForm) (u User, err error) {

	now := time.Now()
	now = now.AddDate(-(18), 0, 0)

	u.Username = rf.Username
	u.AccessLvl = 0
	u.Email = rf.Email
	u.Password = Encrypt(HashKey, rf.Password)
	u.LastName = rf.Lastname
	u.FirstName = rf.Firstname
	u.Birthday, _ = time.Parse(time.RFC3339, now.Format(time.RFC3339Nano))
	u.LastConn, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339Nano))
	u.Interest = "bi"
	u.Genre = "female"
	u.RandomToken = newToken()
	u.Img1 = imageHost + "/blank-profile.png"
	u.Img2 = imageHost + "/blank-profile.png"
	u.Img3 = imageHost + "/blank-profile.png"
	u.Img4 = imageHost + "/blank-profile.png"
	u.Img5 = imageHost + "/blank-profile.png"
	err = SendEmailValidation(u.Username, u.Email, u.RandomToken)
	return
}

func (res *validationResponse) failure() {
	res.Valid = false
	res.Fail = true
	res.Type = "REGISTER_FAIL"
}

func newToken() string {
	b := make([]byte, 32)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}

func emailIsValid(email string) bool {
	re := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	return re.MatchString(email)
}

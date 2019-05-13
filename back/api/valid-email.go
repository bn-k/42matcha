package api

import (
	"bytes"
	"crypto/tls"
	"encoding/base64"
	"fmt"
	"html/template"
	"net"
	"net/mail"
	"net/smtp"
	"strconv"
)

func SendEmail(Title, username, email, Message string) error {
	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	smtpLogin := "camagru4422@gmail.com"
	smtpPasswd := "42istheanswer"

	templateData := struct {
		Name    string
		Message string
		URL     string
	}{
		Name:    username,
		Message: Message,
		URL:     "http://localhost:8080/",
	}

	from := mail.Address{"", smtpLogin}
	to := mail.Address{username, email}
	title := Title
	body, err := ParseTemplate("./api/utils/pass_mail_update.html", templateData)
	if err != nil {
		return err
	}

	useTls := false
	useStartTls := true

	header := make(map[string]string)
	header["From"] = "matcha@42.fr"
	header["To"] = to.String()
	header["Subject"] = title
	header["MIME-Version"] = "1.0"
	header["Content-Type"] = "text/html; charset=\"utf-8\""
	header["Content-Transfer-Encoding"] = "base64"

	message := ""
	for k, v := range header {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + base64.StdEncoding.EncodeToString([]byte(body))

	conn, err := net.Dial("tcp", smtpHost+":"+strconv.Itoa(smtpPort))
	if err != nil {
		return err
	}

	// TLS
	tlsconfig := &tls.Config{
		InsecureSkipVerify: true,
		ServerName:         smtpHost,
	}

	if useTls {
		conn = tls.Client(conn, tlsconfig)
	}

	client, err := smtp.NewClient(conn, smtpHost)
	if err != nil {
		return err
	}

	hasStartTLS, _ := client.Extension("STARTTLS")
	if useStartTls && hasStartTLS {
		if err = client.StartTLS(tlsconfig); err != nil {
			return err
		}
	}

	auth := smtp.PlainAuth(
		"",
		smtpLogin,
		smtpPasswd,
		smtpHost,
	)

	if ok, _ := client.Extension("AUTH"); ok {
		if err := client.Auth(auth); err != nil {
			return err
		}
	}

	if err := client.Mail(from.Address); err != nil {
		return err
	}

	if err := client.Rcpt(to.Address); err != nil {
		return err
	}

	w, err := client.Data()
	if err != nil {
		return err
	}

	_, err = w.Write([]byte(message))
	if err != nil {
		return err
	}

	err = w.Close()
	if err != nil {
		return err
	}
	client.Quit()
	return nil
}

func SendEmailValidation(username, email, token string) error {
	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	smtpLogin := "camagru4422@gmail.com"
	smtpPasswd := "42istheanswer"

	templateData := struct {
		Name string
		URL  string
	}{
		Name: username,
		URL:  "http://localhost:8080/valid_email?token=" + token,
	}

	from := mail.Address{"", smtpLogin}
	to := mail.Address{username, email}
	title := "Validate your address"
	body, err := ParseTemplate("./api/utils/confirm_email.html", templateData)
	if err != nil {
		return err
	}

	useTls := false
	useStartTls := true

	header := make(map[string]string)
	header["From"] = "matcha@42.fr"
	header["To"] = to.String()
	header["Subject"] = title
	header["MIME-Version"] = "1.0"
	header["Content-Type"] = "text/html; charset=\"utf-8\""
	header["Content-Transfer-Encoding"] = "base64"

	message := ""
	for k, v := range header {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + base64.StdEncoding.EncodeToString([]byte(body))

	conn, err := net.Dial("tcp", smtpHost+":"+strconv.Itoa(smtpPort))
	if err != nil {
		return err
	}

	// TLS
	tlsconfig := &tls.Config{
		InsecureSkipVerify: true,
		ServerName:         smtpHost,
	}

	if useTls {
		conn = tls.Client(conn, tlsconfig)
	}

	client, err := smtp.NewClient(conn, smtpHost)
	if err != nil {
		return err
	}

	hasStartTLS, _ := client.Extension("STARTTLS")
	if useStartTls && hasStartTLS {
		if err = client.StartTLS(tlsconfig); err != nil {
			return err
		}
	}

	auth := smtp.PlainAuth(
		"",
		smtpLogin,
		smtpPasswd,
		smtpHost,
	)

	if ok, _ := client.Extension("AUTH"); ok {
		if err := client.Auth(auth); err != nil {
			return err
		}
	}

	if err := client.Mail(from.Address); err != nil {
		return err
	}

	if err := client.Rcpt(to.Address); err != nil {
		return err
	}

	w, err := client.Data()
	if err != nil {
		return err
	}

	_, err = w.Write([]byte(message))
	if err != nil {
		return err
	}

	err = w.Close()
	if err != nil {
		return err
	}
	client.Quit()
	return nil
}

func SendEmailPasswordForgot(username, email, token string) error {
	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	smtpLogin := "camagru4422@gmail.com"
	smtpPasswd := "42istheanswer"

	templateData := struct {
		Name string
		URL  string
	}{
		Name: username,
		URL:  "http://localhost:8080/reset-password?reset_token=" + token,
	}

	from := mail.Address{"", smtpLogin}
	to := mail.Address{username, email}
	title := "Password Changed"
	body, err := ParseTemplate("./api/utils/pass_change.html", templateData)
	if err != nil {
		return err
	}

	useTls := false
	useStartTls := true

	header := make(map[string]string)
	header["From"] = "matcha@42.fr"
	header["To"] = to.String()
	header["Subject"] = title
	header["MIME-Version"] = "1.0"
	header["Content-Type"] = "text/html; charset=\"utf-8\""
	header["Content-Transfer-Encoding"] = "base64"

	message := ""
	for k, v := range header {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + base64.StdEncoding.EncodeToString([]byte(body))

	conn, err := net.Dial("tcp", smtpHost+":"+strconv.Itoa(smtpPort))
	if err != nil {
		return err
	}

	// TLS
	tlsconfig := &tls.Config{
		InsecureSkipVerify: true,
		ServerName:         smtpHost,
	}

	if useTls {
		conn = tls.Client(conn, tlsconfig)
	}

	client, err := smtp.NewClient(conn, smtpHost)
	if err != nil {
		return err
	}

	hasStartTLS, _ := client.Extension("STARTTLS")
	if useStartTls && hasStartTLS {
		if err = client.StartTLS(tlsconfig); err != nil {
			return err
		}
	}

	auth := smtp.PlainAuth(
		"",
		smtpLogin,
		smtpPasswd,
		smtpHost,
	)

	if ok, _ := client.Extension("AUTH"); ok {
		if err := client.Auth(auth); err != nil {
			return err
		}
	}

	if err := client.Mail(from.Address); err != nil {
		return err
	}

	if err := client.Rcpt(to.Address); err != nil {
		return err
	}

	w, err := client.Data()
	if err != nil {
		return err
	}

	_, err = w.Write([]byte(message))
	if err != nil {
		return err
	}

	err = w.Close()
	if err != nil {
		return err
	}
	client.Quit()
	return nil
}

func ParseTemplate(templateFileName string, data interface{}) (string, error) {
	t, err := template.ParseFiles(templateFileName)
	if err != nil {
		return "", err
	}
	buf := new(bytes.Buffer)
	if err = t.Execute(buf, data); err != nil {
		return "", err
	}
	body := buf.String()
	return body, err
}

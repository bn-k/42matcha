package main

import (
	"github.com/Newcratie/matcha-api/api"
	"testing"
)

func TestMail(t *testing.T) {
	api.SendEmailValidation("abben", "newcratie@gmail.com", "blablaasdfasdj;asja")
}

FROM golang:latest

ADD install.sh install.sh
RUN sh install.sh
EXPOSE 8181

WORKDIR /back
CMD go run run.go
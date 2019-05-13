FROM golang:latest

ADD install.sh install.sh
RUN sh install.sh
EXPOSE 8181

CMD go run /app/back/run.go
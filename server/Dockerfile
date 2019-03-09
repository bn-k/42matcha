FROM golang

RUN go get github.com/oxequa/realize
RUN go get github.com/Newcratie/matcha-api
WORKDIR /go/src/github.com/Newcratie/matcha-api/api
RUN go get
EXPOSE 81

WORKDIR /go/src/github.com/Newcratie/matcha-api
CMD ["realize", "start"]

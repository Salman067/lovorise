FROM golang:latest
ENV GO111MODULE=on

RUN mkdir /app
WORKDIR /app

RUN apt-get update && apt-get install -y git

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

RUN go build -o /main .
EXPOSE 4000
CMD ["/main"]

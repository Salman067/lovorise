package main

import (
	"lovorise-admin/pkg/containers"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	containers.Serve(r)
}

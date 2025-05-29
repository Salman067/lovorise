package utils

import (
	"time"

	"github.com/gin-gonic/gin"
)

type ErrorResponse struct {
	Error     bool      `json:"error"`
	Message   string    `json:"message"`
	Code      string    `json:"code,omitempty"`
	Timestamp time.Time `json:"timestamp"`
}

type SuccessResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Message string      `json:"message,omitempty"`
}

func SendErrorResponse(c *gin.Context, statusCode int, message, code string) {
	c.JSON(statusCode, ErrorResponse{
		Error:     true,
		Message:   message,
		Code:      code,
		Timestamp: time.Now(),
	})
}

func SendSuccessResponse(c *gin.Context, statusCode int, data interface{}, message string) {
	c.JSON(statusCode, SuccessResponse{
		Success: true,
		Data:    data,
		Message: message,
	})
}

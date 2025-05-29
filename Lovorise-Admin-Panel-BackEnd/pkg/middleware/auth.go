package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error":   true,
				"message": "Authorization header is required",
			})
			c.Abort()
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error":   true,
				"message": "Invalid authorization header format",
			})
			c.Abort()
			return
		}

		token := strings.TrimPrefix(authHeader, "Bearer ")
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error":   true,
				"message": "Token is required",
			})
			c.Abort()
			return
		}

		if !isValidToken(token) {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error":   true,
				"message": "Invalid or expired token",
			})
			c.Abort()
			return
		}

		c.Set("user_id", "admin") 
		c.Next()
	}
}

func isValidToken(token string) bool {
	validTokens := []string{
		"admin_token_123",
		"test_token_456",
		"dev_token_789",
	}
	
	for _, validToken := range validTokens {
		if token == validToken {
			return true
		}
	}
	
	return len(token) > 10 
}
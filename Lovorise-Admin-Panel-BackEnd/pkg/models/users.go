package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID         string         `json:"user_id" gorm:"primaryKey;type:varchar(255)"`
	Name       string         `json:"name" gorm:"not null"`
	Email      string         `json:"email" gorm:"unique;not null"`
	Gender     string         `json:"gender" gorm:"type:varchar(10)"`
	Hearts     int            `json:"hearts" gorm:"default:0"`
	Country    string         `json:"country" gorm:"type:varchar(100)"`
	Avatar     string         `json:"avatar"`
	IsActive   bool           `json:"is_active" gorm:"default:true"`
	IsPremium  bool           `json:"is_premium" gorm:"default:false"`
	JoinedDate time.Time      `json:"joined_date" gorm:"autoCreateTime"`
	LastActive time.Time      `json:"last_active"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"-" gorm:"index"`
}

type UserActivity struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	UserID       string    `json:"user_id" gorm:"not null;index"`
	ActivityType string    `json:"activity_type" gorm:"not null"`
	Module       string    `json:"module" gorm:"not null"`
	Score        int       `json:"score" gorm:"default:1"`
	Timestamp    time.Time `json:"timestamp" gorm:"autoCreateTime"`
	User         User      `json:"user" gorm:"foreignKey:UserID"`
}

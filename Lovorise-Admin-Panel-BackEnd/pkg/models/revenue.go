package models

import (
	"time"

	"gorm.io/gorm"
)

type Revenue struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Amount    float64        `json:"amount" gorm:"not null"`
	Type      string         `json:"type" gorm:"not null"` 
	UserID    string         `json:"user_id" gorm:"not null;index"`
	Date      time.Time      `json:"date" gorm:"not null;index"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
	User      User           `json:"user" gorm:"foreignKey:UserID"`
}

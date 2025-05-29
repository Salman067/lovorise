package models

import (
	"time"

	"gorm.io/gorm"
)

type Engagement struct {
	ID              uint           `json:"id" gorm:"primaryKey"`
	Module          string         `json:"module" gorm:"not null;index"`
	UsageCount      int            `json:"usage_count" gorm:"default:0"`
	EngagementScore float64        `json:"engagement_score" gorm:"default:0"`
	Date            time.Time      `json:"date" gorm:"not null;index"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `json:"-" gorm:"index"`
}

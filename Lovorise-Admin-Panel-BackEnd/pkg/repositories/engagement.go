package repositories

import (
	"lovorise-admin/pkg/models"

	"gorm.io/gorm"
)

type EngagementRepository interface {
	GetEngagementData() ([]models.Engagement, error)
}

type engagementRepository struct {
	db *gorm.DB
}

func NewEngagementRepository(db *gorm.DB) EngagementRepository {
	return &engagementRepository{db: db}
}

func (r *engagementRepository) GetEngagementData() ([]models.Engagement, error) {
	var engagements []models.Engagement
	err := r.db.Find(&engagements).Error
	return engagements, err
}

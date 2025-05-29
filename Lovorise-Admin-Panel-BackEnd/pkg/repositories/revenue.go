package repositories

import (
	"lovorise-admin/pkg/models"

	"gorm.io/gorm"
)

type RevenueRepository interface {
	GetTotalRevenue() (float64, error)
}

type revenueRepository struct {
	db *gorm.DB
}

func NewRevenueRepository(db *gorm.DB) RevenueRepository {
	return &revenueRepository{db: db}
}

func (r *revenueRepository) GetTotalRevenue() (float64, error) {
	var total float64
	err := r.db.Model(&models.Revenue{}).Select("COALESCE(SUM(amount), 0)").Scan(&total).Error
	return total, err
}

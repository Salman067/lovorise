package repositories

import (
	"lovorise-admin/pkg/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	GetActiveUsers() (int64, error)
	GetTotalUsers() (int64, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) GetActiveUsers() (int64, error) {
	var count int64
	err := r.db.Model(&models.User{}).Where("is_active = ?", true).Count(&count).Error
	return count, err
}

func (r *userRepository) GetTotalUsers() (int64, error) {
	var count int64
	err := r.db.Model(&models.User{}).Count(&count).Error
	return count, err
}

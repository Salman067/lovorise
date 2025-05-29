package repositories

import (
	"lovorise-admin/pkg/models"
	"time"

	"gorm.io/gorm"
)

type DashboardRepository interface {
	GetTotalRevenue() (float64, error)
	GetTotalUsers() (int64, error)
	GetActiveUsers() (int64, error)
	GetChartData(rangeType, dataType string) ([]string, []float64, error)
	GetRevenueData() (*models.RevenueResponse, error)
	GetActiveUsersByCountry(limit int) ([]models.CountryUser, error)
	GetRegisteredUsersStats() (*models.RegisteredUsersResponse, error)
	GetMostActiveUsers(limit int) ([]models.MostActiveUser, error)
	GetEngagementModules(category string) ([]models.EngagementModule, error)
	GetActiveUsersList(page, limit int, sort, order string) ([]models.ActiveUsersList, int64, error)
}

type dashboardRepository struct {
	db *gorm.DB
}

func NewDashboardRepository(db *gorm.DB) DashboardRepository {
	return &dashboardRepository{db: db}
}

func (r *dashboardRepository) GetTotalRevenue() (float64, error) {
	var totalRevenue float64
	err := r.db.Model(&models.Revenue{}).Select("COALESCE(SUM(amount), 0)").Scan(&totalRevenue).Error
	return totalRevenue, err
}

func (r *dashboardRepository) GetTotalUsers() (int64, error) {
	var count int64
	err := r.db.Model(&models.User{}).Count(&count).Error
	return count, err
}

func (r *dashboardRepository) GetActiveUsers() (int64, error) {
	var count int64
	err := r.db.Model(&models.User{}).Where("is_active = ? AND last_active > ?",
		true, time.Now().Add(-24*time.Hour)).Count(&count).Error
	return count, err
}

func (r *dashboardRepository) GetChartData(rangeType, dataType string) ([]string, []float64, error) {
	var labels []string
	var data []float64

	now := time.Now()
	var startDate time.Time
	var dateFormat string

	switch rangeType {
	case "weekly":
		startDate = now.AddDate(0, 0, -7)
		dateFormat = "2006-01-02"
	case "monthly":
		startDate = now.AddDate(0, -1, 0)
		dateFormat = "2006-01-02"
	case "yearly":
		startDate = now.AddDate(-1, 0, 0)
		dateFormat = "2006-01"
	default:
		startDate = now.AddDate(0, -1, 0)
		dateFormat = "2006-01-02"
	}

	if dataType == "revenue" {
		rows, err := r.db.Model(&models.Revenue{}).
			Select("DATE_TRUNC('day', date) as period, SUM(amount) as total").
			Where("date >= ?", startDate).
			Group("period").
			Order("period").
			Rows()
		if err != nil {
			return labels, data, err
		}
		defer rows.Close()

		for rows.Next() {
			var period time.Time
			var total float64
			if err := rows.Scan(&period, &total); err != nil {
				continue
			}
			labels = append(labels, period.Format(dateFormat))
			data = append(data, total)
		}
	} else {
		rows, err := r.db.Model(&models.User{}).
			Select("DATE_TRUNC('day', created_at) as period, COUNT(*) as total").
			Where("created_at >= ?", startDate).
			Group("period").
			Order("period").
			Rows()
		if err != nil {
			return labels, data, err
		}
		defer rows.Close()

		for rows.Next() {
			var period time.Time
			var total int64
			if err := rows.Scan(&period, &total); err != nil {
				continue
			}
			labels = append(labels, period.Format(dateFormat))
			data = append(data, float64(total))
		}
	}

	return labels, data, nil
}

func (r *dashboardRepository) GetRevenueData() (*models.RevenueResponse, error) {
	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location())
	weekStart := today.AddDate(0, 0, -7)
	monthStart := today.AddDate(0, -1, 0)

	var dailyRevenue, weeklyRevenue, monthlyRevenue float64

	// Daily revenue
	r.db.Model(&models.Revenue{}).
		Where("date >= ?", today).
		Select("COALESCE(SUM(amount), 0)").
		Scan(&dailyRevenue)

	// Weekly revenue
	r.db.Model(&models.Revenue{}).
		Where("date >= ?", weekStart).
		Select("COALESCE(SUM(amount), 0)").
		Scan(&weeklyRevenue)

	// Monthly revenue
	r.db.Model(&models.Revenue{}).
		Where("date >= ?", monthStart).
		Select("COALESCE(SUM(amount), 0)").
		Scan(&monthlyRevenue)

	return &models.RevenueResponse{
		DailyRevenue:   dailyRevenue,
		WeeklyRevenue:  weeklyRevenue,
		MonthlyRevenue: monthlyRevenue,
		DailyChange:    5.2,  // Mock data 
		WeeklyChange:   12.8, // Mock data
		MonthlyChange:  18.5, // Mock data
	}, nil
}

func (r *dashboardRepository) GetActiveUsersByCountry(limit int) ([]models.CountryUser, error) {
	var countries []models.CountryUser

	query := r.db.Model(&models.User{}).
		Select("country, COUNT(*) as active_users").
		Where("is_active = ? AND country != ''", true).
		Group("country").
		Order("active_users DESC")

	if limit > 0 {
		query = query.Limit(limit)
	}

	err := query.Scan(&countries).Error
	return countries, err
}

func (r *dashboardRepository) GetRegisteredUsersStats() (*models.RegisteredUsersResponse, error) {
	var totalUsers, premiumUsers, freeUsers int64

	r.db.Model(&models.User{}).Count(&totalUsers)
	r.db.Model(&models.User{}).Where("is_premium = ?", true).Count(&premiumUsers)
	freeUsers = totalUsers - premiumUsers

	var premiumPercentage float64
	if totalUsers > 0 {
		premiumPercentage = (float64(premiumUsers) / float64(totalUsers)) * 100
	}

	return &models.RegisteredUsersResponse{
		TotalUsers:        totalUsers,
		PremiumUsers:      premiumUsers,
		FreeUsers:         freeUsers,
		PremiumPercentage: premiumPercentage,
	}, nil
}

func (r *dashboardRepository) GetMostActiveUsers(limit int) ([]models.MostActiveUser, error) {
	var users []models.MostActiveUser

	err := r.db.Model(&models.User{}).
		Select("name, avatar, hearts as activity_score,last_active").
		Where("is_active = ?", true).
		Order("hearts DESC").
		Limit(limit).
		Scan(&users).Error

	// Add activity icons based on score
	for i := range users {
		if users[i].ActivityScore > 900 {
			users[i].ActivityIcon = "🔥"
		} else if users[i].ActivityScore > 700 {
			users[i].ActivityIcon = "⭐"
		} else {
			users[i].ActivityIcon = "👍"
		}
	}

	return users, err
}

func (r *dashboardRepository) GetEngagementModules(category string) ([]models.EngagementModule, error) {
	var modules []models.EngagementModule

	var totalEngagement int64
	r.db.Model(&models.Engagement{}).
		Select("SUM(usage_count)").
		Scan(&totalEngagement)

	var engagements []models.Engagement
	err := r.db.Model(&models.Engagement{}).
		Select("module, SUM(usage_count) as usage_count, AVG(engagement_score) as engagement_score").
		Group("module").
		Order("usage_count DESC").
		Find(&engagements).Error

	if err != nil {
		return modules, err
	}

	for _, engagement := range engagements {
		var usagePercentage float64
		if totalEngagement > 0 {
			usagePercentage = (float64(engagement.UsageCount) / float64(totalEngagement)) * 100
		}

		modules = append(modules, models.EngagementModule{
			Name:            engagement.Module,
			UsagePercentage: usagePercentage,
			EngagementScore: engagement.EngagementScore,
		})
	}

	return modules, nil
}

func (r *dashboardRepository) GetActiveUsersList(page, limit int, sort, order string) ([]models.ActiveUsersList, int64, error) {
	var users []models.ActiveUsersList
	var total int64

	offset := (page - 1) * limit

	r.db.Model(&models.User{}).Where("is_active = ?", true).Count(&total)

	query := r.db.Model(&models.User{}).
		Select("id as user_id, name, email, gender, hearts, joined_date").
		Where("is_active = ?", true)

	orderClause := "hearts DESC" 
	if sort == "date" {
		if order == "asc" {
			orderClause = "joined_date ASC"
		} else {
			orderClause = "joined_date DESC"
		}
	} else if sort == "hearts" {
		if order == "asc" {
			orderClause = "hearts ASC"
		} else {
			orderClause = "hearts DESC"
		}
	}

	err := query.Order(orderClause).
		Offset(offset).
		Limit(limit).
		Scan(&users).Error

	return users, total, err
}

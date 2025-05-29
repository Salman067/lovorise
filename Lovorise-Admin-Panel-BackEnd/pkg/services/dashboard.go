package services

import (
	"lovorise-admin/pkg/models"
	"lovorise-admin/pkg/repositories"
	"math"
	"time"
)

type DashboardService interface {
	GetOverview() (*models.OverviewResponse, error)
	GetCharts(rangeType, dataType string) (*models.ChartResponse, error)
	GetRevenue() (*models.RevenueResponse, error)
	GetActiveUsers() (*models.ActiveUsersResponse, error)
	GetRegisteredUsers() (*models.RegisteredUsersResponse, error)
	GetMostActiveUsers(limit int) (*models.MostActiveUsersResponse, error)
	GetActiveUsersByCountry(limit int) (*models.CountryUserResponse, error)
	GetEngagementModules(category string) (*models.EngagementModulesResponse, error)
	GetActiveUsersList(page, limit int, sort, order string) (*models.ActiveUsersListResponse, error)
}

type dashboardService struct {
	dashboardRepo  repositories.DashboardRepository
	userRepo       repositories.UserRepository
	revenueRepo    repositories.RevenueRepository
	engagementRepo repositories.EngagementRepository
}

func NewDashboardService(
	dashboardRepo repositories.DashboardRepository,
	userRepo repositories.UserRepository,
	revenueRepo repositories.RevenueRepository,
	engagementRepo repositories.EngagementRepository,
) DashboardService {
	return &dashboardService{
		dashboardRepo:  dashboardRepo,
		userRepo:       userRepo,
		revenueRepo:    revenueRepo,
		engagementRepo: engagementRepo,
	}
}

func (s *dashboardService) GetOverview() (*models.OverviewResponse, error) {
	totalRevenue, err := s.dashboardRepo.GetTotalRevenue()
	if err != nil {
		return nil, err
	}

	totalUsers, err := s.dashboardRepo.GetTotalUsers()
	if err != nil {
		return nil, err
	}

	activeUsers, err := s.dashboardRepo.GetActiveUsers()
	if err != nil {
		return nil, err
	}

	return &models.OverviewResponse{
		TotalRevenue: totalRevenue,
		TotalUsers:   totalUsers,
		ActiveUsers:  activeUsers,
	}, nil
}

func (s *dashboardService) GetCharts(rangeType, dataType string) (*models.ChartResponse, error) {
	labels, data, err := s.dashboardRepo.GetChartData(rangeType, dataType)
	if err != nil {
		return nil, err
	}
	growthPercentage := s.calculateGrowthPercentage(data)

	return &models.ChartResponse{
		Labels:           labels,
		Data:             data,
		GrowthPercentage: growthPercentage,
	}, nil
}

func (s *dashboardService) GetRevenue() (*models.RevenueResponse, error) {
	return s.dashboardRepo.GetRevenueData()
}

func (s *dashboardService) GetActiveUsers() (*models.ActiveUsersResponse, error) {
	activeUsers, err := s.dashboardRepo.GetActiveUsers()
	if err != nil {
		return nil, err
	}

	return &models.ActiveUsersResponse{
		ActiveUsers: activeUsers,
		LastUpdated: time.Now(),
	}, nil
}

func (s *dashboardService) GetRegisteredUsers() (*models.RegisteredUsersResponse, error) {
	return s.dashboardRepo.GetRegisteredUsersStats()
}

func (s *dashboardService) GetMostActiveUsers(limit int) (*models.MostActiveUsersResponse, error) {
	if limit <= 0 {
		limit = 5
	}

	users, err := s.dashboardRepo.GetMostActiveUsers(limit)
	if err != nil {
		return nil, err
	}

	return &models.MostActiveUsersResponse{
		Users: users,
	}, nil
}

func (s *dashboardService) GetActiveUsersByCountry(limit int) (*models.CountryUserResponse, error) {
	countries, err := s.dashboardRepo.GetActiveUsersByCountry(limit)
	if err != nil {
		return nil, err
	}

	return &models.CountryUserResponse{
		Countries: countries,
	}, nil
}

func (s *dashboardService) GetEngagementModules(category string) (*models.EngagementModulesResponse, error) {
	modules, err := s.dashboardRepo.GetEngagementModules(category)
	if err != nil {
		return nil, err
	}

	return &models.EngagementModulesResponse{
		Modules: modules,
	}, nil
}

func (s *dashboardService) GetActiveUsersList(page, limit int, sort, order string) (*models.ActiveUsersListResponse, error) {
	if page <= 0 {
		page = 1
	}
	if limit <= 0 {
		limit = 20
	}

	users, total, err := s.dashboardRepo.GetActiveUsersList(page, limit, sort, order)
	if err != nil {
		return nil, err
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))

	return &models.ActiveUsersListResponse{
		Users: users,
		Pagination: models.Pagination{
			CurrentPage:  page,
			TotalPages:   totalPages,
			TotalItems:   total,
			ItemsPerPage: limit,
		},
	}, nil
}

func (s *dashboardService) calculateGrowthPercentage(data []float64) float64 {
	if len(data) < 2 {
		return 0
	}

	current := data[len(data)-1]
	previous := data[len(data)-2]

	if previous == 0 {
		return 0
	}

	return ((current - previous) / previous) * 100
}

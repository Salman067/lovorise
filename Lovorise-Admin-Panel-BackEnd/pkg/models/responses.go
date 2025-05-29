package models

import "time"

type OverviewResponse struct {
	TotalRevenue float64 `json:"total_revenue"`
	TotalUsers   int64   `json:"total_users"`
	ActiveUsers  int64   `json:"active_users"`
}

type ChartResponse struct {
	Labels           []string  `json:"labels"`
	Data             []float64 `json:"data"`
	GrowthPercentage float64   `json:"growth_percentage"`
}

type CountryUserResponse struct {
	Countries []CountryUser `json:"countries"`
}

type CountryUser struct {
	Country     string `json:"country"`
	ActiveUsers int64  `json:"active_users"`
}

type RevenueResponse struct {
	DailyRevenue   float64 `json:"daily_revenue"`
	WeeklyRevenue  float64 `json:"weekly_revenue"`
	MonthlyRevenue float64 `json:"monthly_revenue"`
	DailyChange    float64 `json:"daily_change"`
	WeeklyChange   float64 `json:"weekly_change"`
	MonthlyChange  float64 `json:"monthly_change"`
}

type ActiveUsersResponse struct {
	ActiveUsers int64     `json:"active_users"`
	LastUpdated time.Time `json:"last_updated"`
}

type RegisteredUsersResponse struct {
	TotalUsers        int64   `json:"total_users"`
	PremiumUsers      int64   `json:"premium_users"`
	FreeUsers         int64   `json:"free_users"`
	PremiumPercentage float64 `json:"premium_percentage"`
}

type MostActiveUser struct {
	Name          string    `json:"name"`
	Avatar        string    `json:"avatar"`
	ActivityScore int       `json:"activity_score"`
	ActivityIcon  string    `json:"activity_icon"`
	Time          time.Time `json:"time"`
}

type MostActiveUsersResponse struct {
	Users []MostActiveUser `json:"users"`
}

type EngagementModule struct {
	Name            string  `json:"name"`
	UsagePercentage float64 `json:"usage_percentage"`
	EngagementScore float64 `json:"engagement_score"`
}

type EngagementModulesResponse struct {
	Modules []EngagementModule `json:"modules"`
}

type ActiveUsersList struct {
	UserID     string    `json:"user_id"`
	Name       string    `json:"name"`
	Email      string    `json:"email"`
	Gender     string    `json:"gender"`
	Hearts     int       `json:"hearts"`
	JoinedDate time.Time `json:"joined_date"`
}

type ActiveUsersListResponse struct {
	Users      []ActiveUsersList `json:"users"`
	Pagination Pagination        `json:"pagination"`
}

type Pagination struct {
	CurrentPage  int   `json:"current_page"`
	TotalPages   int   `json:"total_pages"`
	TotalItems   int64 `json:"total_items"`
	ItemsPerPage int   `json:"items_per_page"`
}

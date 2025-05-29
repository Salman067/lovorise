package controllers

import (
	"lovorise-admin/pkg/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type DashboardController struct {
	dashboardService services.DashboardService
}

func NewDashboardController(dashboardService services.DashboardService) *DashboardController {
	return &DashboardController{
		dashboardService: dashboardService,
	}
}

func (ctrl *DashboardController) GetOverview(c *gin.Context) {
	overview, err := ctrl.dashboardService.GetOverview()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":     true,
			"message":   "Failed to fetch overview data",
			"timestamp": c.GetHeader("X-Request-ID"),
		})
		return
	}

	c.JSON(http.StatusOK, overview)
}

func (ctrl *DashboardController) GetCharts(c *gin.Context) {
	rangeType := c.DefaultQuery("range", "monthly")
	dataType := c.DefaultQuery("type", "revenue")

	charts, err := ctrl.dashboardService.GetCharts(rangeType, dataType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":     true,
			"message":   "Failed to fetch chart data",
			"timestamp": c.GetHeader("X-Request-ID"),
		})
		return
	}

	c.JSON(http.StatusOK, charts)
}

func (ctrl *DashboardController) GetRevenue(c *gin.Context) {
	revenue, err := ctrl.dashboardService.GetRevenue()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":     true,
			"message":   "Failed to fetch revenue data",
			"timestamp": c.GetHeader("X-Request-ID"),
		})
		return
	}

	c.JSON(http.StatusOK, revenue)
}

func (ctrl *DashboardController) GetActiveUsers(c *gin.Context) {
	activeUsers, err := ctrl.dashboardService.GetActiveUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":     true,
			"message":   "Failed to fetch active users data",
			"timestamp": c.GetHeader("X-Request-ID"),
		})
		return
	}

	c.JSON(http.StatusOK, activeUsers)
}

func (ctrl *DashboardController) GetRegisteredUsers(c *gin.Context) {
	registeredUsers, err := ctrl.dashboardService.GetRegisteredUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":     true,
			"message":   "Failed to fetch registered users data",
			"timestamp": c.GetHeader("X-Request-ID"),
		})
		return
	}

	c.JSON(http.StatusOK, registeredUsers)
}

func (ctrl *DashboardController) GetMostActiveUsers(c *gin.Context) {
	limit := 5
	if l := c.Query("limit"); l != "" {
		if parsed, err := strconv.Atoi(l); err == nil && parsed > 0 {
			limit = parsed
		}
	}

	mostActiveUsers, err := ctrl.dashboardService.GetMostActiveUsers(limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":     true,
			"message":   "Failed to fetch most active users data",
			"timestamp": c.GetHeader("X-Request-ID"),
		})
		return
	}

	c.JSON(http.StatusOK, mostActiveUsers)
}

func (ctrl *DashboardController) GetActiveUsersByCountry(c *gin.Context) {
	limit := 0
	if l := c.Query("limit"); l != "" {
		if parsed, err := strconv.Atoi(l); err == nil && parsed > 0 {
			limit = parsed
		}
	}

	activeUsersByCountry, err := ctrl.dashboardService.GetActiveUsersByCountry(limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":     true,
			"message":   "Failed to fetch active users by country data",
			"timestamp": c.GetHeader("X-Request-ID"),
		})
		return
	}

	c.JSON(http.StatusOK, activeUsersByCountry)
}

func (ctrl *DashboardController) GetEngagementModules(c *gin.Context) {
	category := c.Query("category")

	engagementModules, err := ctrl.dashboardService.GetEngagementModules(category)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":     true,
			"message":   "Failed to fetch engagement modules data",
			"timestamp": c.GetHeader("X-Request-ID"),
		})
		return
	}

	c.JSON(http.StatusOK, engagementModules)
}

func (ctrl *DashboardController) GetActiveUsersList(c *gin.Context) {
	page := 1
	if p := c.Query("page"); p != "" {
		if parsed, err := strconv.Atoi(p); err == nil && parsed > 0 {
			page = parsed
		}
	}

	limit := 20
	if l := c.Query("limit"); l != "" {
		if parsed, err := strconv.Atoi(l); err == nil && parsed > 0 {
			limit = parsed
		}
	}

	sort := c.DefaultQuery("sort", "hearts")
	order := c.DefaultQuery("order", "desc")

	activeUsersList, err := ctrl.dashboardService.GetActiveUsersList(page, limit, sort, order)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":     true,
			"message":   "Failed to fetch active users list",
			"timestamp": c.GetHeader("X-Request-ID"),
		})
		return
	}

	c.JSON(http.StatusOK, activeUsersList)
}

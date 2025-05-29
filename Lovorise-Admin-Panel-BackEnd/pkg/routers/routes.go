package routers

import (
	"lovorise-admin/pkg/controllers"
	"lovorise-admin/pkg/middleware"

	"github.com/gin-gonic/gin"
)

func Routes(router *gin.Engine, dashboardController *controllers.DashboardController) {
	api := router.Group("/api")
	api.Use(middleware.AuthMiddleware())
	{
		dashboard := api.Group("/dashboard")
		{
			dashboard.GET("/overview", dashboardController.GetOverview)
			dashboard.GET("/charts", dashboardController.GetCharts)
			dashboard.GET("/revenue", dashboardController.GetRevenue)

			users := dashboard.Group("/users")
			{
				users.GET("/active", dashboardController.GetActiveUsers)
				users.GET("/registered", dashboardController.GetRegisteredUsers)
				users.GET("/most-active", dashboardController.GetMostActiveUsers)
				users.GET("/active-by-country", dashboardController.GetActiveUsersByCountry)
				users.GET("/active-list", dashboardController.GetActiveUsersList)
			}

			engagements := dashboard.Group("/engagements")
			{
				engagements.GET("/modules", dashboardController.GetEngagementModules)
			}
		}
	}
}

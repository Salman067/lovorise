package containers

import (
	"fmt"
	"log"
	"lovorise-admin/pkg/config"
	"lovorise-admin/pkg/connection"
	"lovorise-admin/pkg/controllers"
	"lovorise-admin/pkg/middleware"
	"lovorise-admin/pkg/repositories"
	"lovorise-admin/pkg/routers"
	"lovorise-admin/pkg/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Serve(r *gin.Engine) {
	config.SetConfig()
	db := connection.GetDB()

	dashboardRepo := repositories.NewDashboardRepository(db)
	userRepo := repositories.NewUserRepository(db)
	revenueRepo := repositories.NewRevenueRepository(db)
	engagementRepo := repositories.NewEngagementRepository(db)

	dashboardService := services.NewDashboardService(dashboardRepo, userRepo, revenueRepo, engagementRepo)

	dashboardController := controllers.NewDashboardController(dashboardService)

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "OK"})
	})

	r.Use(middleware.CORSMiddleware())
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	routers.Routes(r, dashboardController)

	port := fmt.Sprintf(":%s", config.LocalConfig.Port)
	log.Fatal(r.Run(port))
}

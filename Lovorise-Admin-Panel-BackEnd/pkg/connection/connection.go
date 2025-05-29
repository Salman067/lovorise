package connection

import (
	"fmt"
	"log"
	"lovorise-admin/pkg/config"
	"lovorise-admin/pkg/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var db *gorm.DB

func Connect() {
	dbConfig := config.LocalConfig

	dsn := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		dbConfig.DBHOST, dbConfig.DBPort, dbConfig.DBUser, dbConfig.DBPass, dbConfig.DBName,
	)

	fmt.Println("Connecting to:", dsn)

	d, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		fmt.Println("Error connecting to DB:", err)
		panic(err)
	}

	fmt.Println("✅ Database Connected")
	db = d
}

func migrate() {
	//db.Migrator().DropTable(&models.User{})
	err := db.AutoMigrate(
		&models.User{},
		&models.Revenue{},
		&models.Engagement{},
		&models.UserActivity{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

}

func GetDB() *gorm.DB {
	if db == nil {
		Connect()
	}
	migrate()
	return db
}

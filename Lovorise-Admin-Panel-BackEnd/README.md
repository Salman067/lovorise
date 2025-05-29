# Lovorise Admin Panel – Dashboard API

The Lovorise Admin Panel is a comprehensive dashboard built to manage and monitor the Lovorise app, providing real-time insights into users, revenue, and engagement metrics. This API serves as the backend for the admin dashboard interface.

## 🚀 Tech Stack

- **Backend**: Go (Golang)
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **Authentication**: Bearer Token
- **Response Format**: JSON

## 📋 Prerequisites

- Docker and Docker Compose installed
- Go 1.19+ (for local development)
- PostgreSQL 14+ (if running locally)

## 🛠️ Installation & Setup

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd lovorise-admin-panel
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
```env
# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_NAME=lovorise_admin
DB_USER=lovorise_user
DB_PASSWORD=your_secure_password

# API Configuration
API_PORT=4000
JWT_SECRET=your_jwt_secret_key

# Environment
ENVIRONMENT=development
```

4. Start the application:
```bash
docker-compose up -d
```

5. The API will be available at `http://localhost:4000`

### Local Development Setup

1. Install dependencies:
```bash
go mod download
```

2. Set up PostgreSQL database and run migrations:
```bash
go run cmd/migrate/main.go
```

3. Start the development server:
```bash
go run main.go
```

## 🔐 Authentication

All API endpoints require authentication using Bearer tokens.

**Header Format:**
```
Authorization: Bearer <your_access_token>
```

## 📊 API Endpoints

### Dashboard Overview

#### 1. GET `/api/dashboard/overview`
Fetch key dashboard metrics displayed in the top summary cards.

**Response:**
```json
{
  "total_revenue": 125000.50,
  "total_users": 15420,
  "active_users": 8942
}
```

---

### Chart Data

#### 2. GET `/api/dashboard/charts`
Retrieve financial growth and user activity chart data for visualization.

**Query Parameters:**
- `range`: `weekly` | `monthly` | `yearly`
- `type`: `revenue` | `users`

**Example Request:**
```
GET /api/dashboard/charts?range=monthly&type=revenue
```

**Response:**
```json
{
  "labels": ["Jan", "Feb", "Mar", "Apr", "May"],
  "data": [12000, 15000, 18000, 22000, 25000],
  "growth_percentage": 15.2
}
```

---

### User Analytics

#### 3. GET `/api/dashboard/users/active-by-country`
Get active user distribution by country for geographic insights.

**Query Parameters (Optional):**
- `limit`: Number of countries to return (default: 10)

**Example Request:**
```
GET /api/dashboard/users/active-by-country?limit=5
```

**Response:**
```json
{
  "countries": [
    {"country": "United States", "active_users": 3420},
    {"country": "United Kingdom", "active_users": 1850},
    {"country": "Canada", "active_users": 1230},
    {"country": "Australia", "active_users": 890},
    {"country": "Germany", "active_users": 750}
  ]
}
```

#### 4. GET `/api/dashboard/revenue`
Provides comprehensive revenue summary with trend analysis.

**Response:**
```json
{
  "daily_revenue": 1250.00,
  "weekly_revenue": 8750.00,
  "monthly_revenue": 35000.00,
  "daily_change": 5.2,
  "weekly_change": 12.8,
  "monthly_change": 18.5
}
```

#### 5. GET `/api/dashboard/users/active`
Get the total number of currently active users.

**Response:**
```json
{
  "active_users": 8942,
  "last_updated": "2024-01-15T10:30:00Z"
}
```

#### 6. GET `/api/dashboard/users/registered`
Overview of registered users segmented by subscription type.

**Response:**
```json
{
  "total_users": 15420,
  "premium_users": 4830,
  "free_users": 10590,
  "premium_percentage": 31.3
}
```

#### 7. GET `/api/dashboard/users/most-active`
Lists the most active users based on their interaction scores.

**Response:**
```json
{
  "users": [
    {
      "name": "Alice Johnson",
      "avatar": "https://example.com/avatars/alice.jpg",
      "activity_score": 950,
      "activity_icon": "🔥"
    },
    {
      "name": "Bob Smith",
      "avatar": "https://example.com/avatars/bob.jpg",
      "activity_score": 890,
      "activity_icon": "⭐"
    }
  ]
}
```

---

### Engagement Analytics

#### 8. GET `/api/dashboard/engagements/modules`
Get user engagement metrics segmented by different app modules.

**Query Parameters (Optional):**
- `category`: `platforms` | `time_period` | `activity_type` | `subscription_status`

**Response:**
```json
{
  "modules": [
    {
      "name": "Swipes",
      "usage_percentage": 35.2,
      "engagement_score": 8.5
    },
    {
      "name": "Events",
      "usage_percentage": 22.8,
      "engagement_score": 7.2
    },
    {
      "name": "Reels",
      "usage_percentage": 18.5,
      "engagement_score": 9.1
    },
    {
      "name": "Chat",
      "usage_percentage": 15.3,
      "engagement_score": 8.8
    },
    {
      "name": "Others",
      "usage_percentage": 8.2,
      "engagement_score": 6.5
    }
  ]
}
```

#### 9. GET `/api/dashboard/users/active-list`
Retrieve a paginated list of the most active users with detailed information.

**Query Parameters (Optional):**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `sort`: `hearts` | `date` (default: hearts)
- `order`: `asc` | `desc` (default: desc)

**Example Request:**
```
GET /api/dashboard/users/active-list?page=1&limit=10&sort=hearts&order=desc
```

**Response:**
```json
{
  "users": [
    {
      "user_id": "usr_123456",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "gender": "female",
      "hearts": 1250,
      "joined_date": "2023-06-15T09:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 45,
    "total_items": 892,
    "items_per_page": 10
  }
}
```

---

## 🐳 Docker Configuration

### docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "4000:4000"
    environment:
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=lovorise_admin
      - DB_USER=lovorise_user
      - DB_PASSWORD=secure_password
    depends_on:
      - postgres
    
  postgres:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=lovorise_admin
      - POSTGRES_USER=lovorise_user
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

## 🚀 Development

### Running Tests
```bash
go test ./...
```

### Building for Production
```bash
docker build -t lovorise-admin-api .
```

### Database Migrations
```bash
go run cmd/migrate/main.go up
```

## 📝 Error Handling

All endpoints return standardized error responses:

```json
{
  "error": true,
  "message": "Description of the error",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | localhost |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_NAME` | Database name | lovorise_admin |
| `DB_USER` | Database user | - |
| `DB_PASSWORD` | Database password | - |
| `API_PORT` | API server port | 4000 |
| `JWT_SECRET` | JWT signing secret | - |
| `ENVIRONMENT` | Runtime environment | development |

## 📈 Performance

- Database connection pooling enabled
- Redis caching for frequently accessed data
- Rate limiting implemented
- Request/response compression enabled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Version**: 1.0.0  

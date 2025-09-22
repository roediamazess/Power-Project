# Power Project - Laravel 12 with Docker & PostgreSQL

A modern web application built with Laravel 12, Docker, and PostgreSQL featuring a beautiful admin dashboard template.

## 🚀 Features

- **Laravel 12** - Latest Laravel framework
- **Docker** - Containerized development environment
- **PostgreSQL** - Robust database system
- **Authentication** - Complete login/logout system
- **Admin Dashboard** - Beautiful FabKin template
- **Responsive Design** - Mobile-friendly interface

## 📋 Prerequisites

- Docker Desktop
- Docker Compose

## 🛠️ Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/roediamazess/Power-Project.git
cd Power-Project
```

### 2. Start with Docker
```bash
# Start containers
docker compose up -d

# Generate application key
docker compose exec app php artisan key:generate

# Run migrations and seeders
docker compose exec app php artisan migrate:fresh --seed

# Install npm dependencies
docker compose exec node npm install
```

### 3. Access Application
- **Website**: http://localhost:8000
- **Database**: localhost:5432
- **Redis**: localhost:6379
- **Adminer (Database Admin)**: http://localhost:8080

## 🔐 Default Login

### Website Login
- **Email**: admin@powerproject.com
- **Password**: admin123

### Database Admin (Adminer)
- **URL**: http://localhost:8080
- **System**: PostgreSQL
- **Server**: db
- **Username**: power_user
- **Password**: power_password
- **Database**: power_project

## 🐳 Docker Services

- **app**: Laravel application (PHP 8.2-FPM)
- **nginx**: Web server (port 8000)
- **db**: PostgreSQL database (port 5432)
- **redis**: Redis cache (port 6379)
- **node**: Node.js for frontend assets
- **adminer**: Database administration (port 8080)

## 📁 Project Structure

```
Power-Project/
├── app/                    # Laravel application
├── database/              # Migrations and seeders
├── resources/views/       # Blade templates
├── public/               # Public assets
├── docker/               # Docker configurations
├── docker-compose.yml    # Docker services
└── Dockerfile           # PHP container
```

## 🛠️ Development Commands

```bash
# View logs
docker compose logs -f

# Stop containers
docker compose down

# Rebuild containers
docker compose up -d --build

# Access app container
docker compose exec app bash

# Run artisan commands
docker compose exec app php artisan [command]

# Run npm commands
docker compose exec node npm [command]
```

## 🔧 Configuration

### Database Configuration
- **Host**: db
- **Port**: 5432
- **Database**: power_project
- **Username**: power_user
- **Password**: power_password

### Environment Variables
Copy `.env.example` to `.env` and configure:
```env
APP_NAME=PowerProject
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=power_project
DB_USERNAME=power_user
DB_PASSWORD=power_password
```

## 📝 Version History

### v1.0.0 - Initial Release
- ✅ Laravel 12 setup
- ✅ Docker containerization
- ✅ PostgreSQL database
- ✅ Authentication system
- ✅ Admin dashboard template
- ✅ User management
- ✅ Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**roediamazess**
- GitHub: [@roediamazess](https://github.com/roediamazess)

## 🙏 Acknowledgments

- Laravel Framework
- FabKin Admin Template
- Docker Community
- PostgreSQL Team
# Power Project - Docker Setup

Website template dengan Laravel 12, Docker, dan PostgreSQL.

## Prerequisites

- Docker Desktop (sudah terinstall)
- Docker Compose

## Quick Start

1. **Setup Environment**
   ```bash
   # Copy file .env (jika belum ada)
   copy .env.example .env
   ```

2. **Build dan Start Containers**
   ```bash
   # Build containers
   docker-compose build

   # Start containers
   docker-compose up -d
   ```

3. **Setup Laravel**
   ```bash
   # Generate application key
   docker-compose exec app php artisan key:generate

   # Run migrations
   docker-compose exec app php artisan migrate

   # Install npm dependencies
   docker-compose exec node npm install
   ```

4. **Access Application**
   - Website: http://localhost:8000
   - Database: localhost:5432
   - Redis: localhost:6379

## Services

- **app**: Laravel application (PHP 8.2-FPM)
- **nginx**: Web server
- **db**: PostgreSQL database
- **redis**: Redis cache
- **node**: Node.js for frontend assets

## Database Configuration

- **Host**: db
- **Port**: 5432
- **Database**: power_project
- **Username**: power_user
- **Password**: power_password

## Useful Commands

```bash
# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild containers
docker-compose up -d --build

# Access app container
docker-compose exec app bash

# Run artisan commands
docker-compose exec app php artisan [command]

# Run npm commands
docker-compose exec node npm [command]
```

## Development

Untuk development, gunakan:
```bash
# Start development server
docker-compose exec node npm run dev

# Watch for changes
docker-compose exec node npm run watch
```

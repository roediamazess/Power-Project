@echo off
echo Setting up Power Project with Docker...

REM Copy .env.example to .env if .env doesn't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)

REM Build and start containers
echo Building Docker containers...
docker-compose build

echo Starting containers...
docker-compose up -d

REM Wait for database to be ready
echo Waiting for database to be ready...
timeout /t 10

REM Generate application key
echo Generating application key...
docker-compose exec app php artisan key:generate

REM Run migrations
echo Running database migrations...
docker-compose exec app php artisan migrate

REM Install npm dependencies
echo Installing npm dependencies...
docker-compose exec node npm install

echo Setup complete! Your application is running at http://localhost:8000
pause

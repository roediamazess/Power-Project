@echo off
echo Starting Power Project with Docker...

REM Start containers
echo Starting Docker containers...
docker compose up -d

REM Wait for containers to be ready
echo Waiting for containers to be ready...
timeout /t 15

REM Generate application key
echo Generating application key...
docker compose exec app php artisan key:generate

REM Run migrations
echo Running database migrations...
docker compose exec app php artisan migrate

REM Install npm dependencies
echo Installing npm dependencies...
docker compose exec node npm install

echo.
echo Setup complete! Your application is running at http://localhost:8000
echo.
echo To stop the application, run: docker compose down
echo To view logs, run: docker compose logs -f
echo.
pause

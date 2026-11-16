@echo off
echo ========================================================
echo   Web Programming Lab 10 - PHP Development Server
echo ========================================================
echo.
echo Starting PHP server on http://localhost:8000 ...
echo Press Ctrl+C in this terminal window to stop the server.
echo.
cd /d "%~dp0\.."
php -S localhost:8000
pause

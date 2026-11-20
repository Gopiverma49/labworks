@echo off
title AURA Lab 12 Dynamic Online Store
echo ========================================================
echo   AURA ONLINE ATELIER - LAB 12 (CSS + JS + XML)
echo ========================================================
echo.
echo Starting local web server on port 8000...
echo Opening http://localhost:8000/index.html in your default browser.
echo.
start "" http://localhost:8000/index.html
python -m http.server 8000
pause

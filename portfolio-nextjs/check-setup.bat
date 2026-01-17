@echo off
echo ========================================
echo Portfolio Next.js - Setup Checker
echo ========================================
echo.

echo Checking Node.js installation...
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js is installed!
    node --version
    echo.
    echo Checking npm...
    where npm >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [OK] npm is installed!
        npm --version
        echo.
        echo Checking if dependencies are installed...
        if exist "node_modules" (
            echo [OK] Dependencies are installed!
            echo.
            echo You can now run: npm run dev
        ) else (
            echo [INFO] Dependencies not installed yet.
            echo.
            echo Installing dependencies...
            call npm install
            if %ERRORLEVEL% EQU 0 (
                echo.
                echo [SUCCESS] Installation complete!
                echo You can now run: npm run dev
            ) else (
                echo.
                echo [ERROR] Installation failed. Please check the error above.
            )
        )
    ) else (
        echo [ERROR] npm is not found!
        echo Please reinstall Node.js from https://nodejs.org/
    )
) else (
    echo [ERROR] Node.js is NOT installed!
    echo.
    echo Please install Node.js:
    echo 1. Go to https://nodejs.org/
    echo 2. Download the LTS version
    echo 3. Run the installer
    echo 4. Restart your terminal
    echo 5. Run this script again
    echo.
    pause
)

echo.
echo ========================================
pause


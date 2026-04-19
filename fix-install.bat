@echo off
echo ========================================
echo   NestJS Supabase App - Fix Install
echo ========================================
echo.

echo [1/5] Cleaning up old files...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json
echo Done!
echo.

echo [2/5] Clearing npm cache...
call npm cache clean --force
echo Done!
echo.

echo [3/5] Installing dependencies (without scripts)...
call npm install --ignore-scripts --legacy-peer-deps
if errorlevel 1 (
    echo Error installing dependencies!
    pause
    exit /b 1
)
echo Done!
echo.

echo [4/5] Installing Prisma...
call npm install prisma @prisma/client
if errorlevel 1 (
    echo Error installing Prisma!
    pause
    exit /b 1
)
echo Done!
echo.

echo [5/5] Generating Prisma Client...
call npx prisma generate
if errorlevel 1 (
    echo Error generating Prisma Client!
    pause
    exit /b 1
)
echo Done!
echo.

echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Update .env with your Supabase credentials
echo   2. Run: npm run prisma:migrate
echo   3. Run: npm run prisma:seed
echo   4. Run: npm run start:dev
echo.
pause

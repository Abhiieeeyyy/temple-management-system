@echo off
echo Killing all Node.js processes...
taskkill /f /im node.exe 2>nul
if %errorlevel% == 0 (
    echo ✅ Node.js processes killed successfully
) else (
    echo ℹ️  No Node.js processes were running
)
echo.
echo You can now run: npm run dev
pause
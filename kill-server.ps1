# Kill all Node.js processes
Write-Host "Killing all Node.js processes..." -ForegroundColor Yellow

try {
    Get-Process -Name "node" -ErrorAction Stop | Stop-Process -Force
    Write-Host "✅ Node.js processes killed successfully" -ForegroundColor Green
} catch {
    Write-Host "ℹ️  No Node.js processes were running" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "You can now run: npm run dev" -ForegroundColor Green
Read-Host "Press Enter to continue"
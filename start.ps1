$ErrorActionPreference = "Stop"

Write-Host "Installing dependencies..."
pnpm install
Write-Host ""

Write-Host "Starting Frontend Server..."
pnpm dev
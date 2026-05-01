$ErrorActionPreference = "Stop"

Write-Host "Installing dependencies..."
Write-Host "Removing node_modules if exists..."
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}
pnpm install --frozen-lockfile

Write-Host ""

Write-Host "Checking for .env file..."
if (!(Test-Path ".env")) {
    Write-Host ">>> Creating .env file using secrets from .env.example..."
    Copy-Item ".env.example" ".env"
} else {
    Write-Host ".env already exists!"
}

Write-Host ""
Write-Host ">>>>> Don't forget to update .env file to match your credentials! <<<<<"
Write-Host ""

Write-Host "Starting Frontend Server..."
pnpm dev
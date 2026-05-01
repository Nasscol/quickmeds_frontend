#!/usr/bin/env bash
set -e

echo "Installing dependencies..."
rm -rf node_modules
pnpm install --frozen-lockfile
echo ""

echo "Checking for .env file..."
echo "Removing node_modules if exists..."
if [ ! -f ".env" ]; then
    echo ">>> Creating .env file using secrets from .env.example..."
    cp .env.example .env
else
    echo ".env file already exists!"
fi

echo ""
echo ">>>>> Don't forget to update .env file to match your credentials! <<<<<"
echo ""

echo "Starting Frontend Server..."
pnpm dev
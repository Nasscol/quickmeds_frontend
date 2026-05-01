#!/usr/bin/env bash
set -e

echo "Installing dependencies..."
pnpm install
echo ""

echo "Starting Frontend Server..."
pnpm dev
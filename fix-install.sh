#!/bin/bash

echo "========================================"
echo "  NestJS Supabase App - Fix Install"
echo "========================================"
echo ""

echo "[1/5] Cleaning up old files..."
rm -rf node_modules package-lock.json
echo "✅ Done!"
echo ""

echo "[2/5] Clearing npm cache..."
npm cache clean --force
echo "✅ Done!"
echo ""

echo "[3/5] Installing dependencies (without scripts)..."
npm install --ignore-scripts --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo "❌ Error installing dependencies!"
    exit 1
fi
echo "✅ Done!"
echo ""

echo "[4/5] Installing Prisma..."
npm install prisma @prisma/client

if [ $? -ne 0 ]; then
    echo "❌ Error installing Prisma!"
    exit 1
fi
echo "✅ Done!"
echo ""

echo "[5/5] Generating Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Error generating Prisma Client!"
    exit 1
fi
echo "✅ Done!"
echo ""

echo "========================================"
echo "  ✅ Installation Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Update .env with your Supabase credentials"
echo "  2. Run: npm run prisma:migrate"
echo "  3. Run: npm run prisma:seed"
echo "  4. Run: npm run start:dev"
echo ""

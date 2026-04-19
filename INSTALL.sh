#!/bin/bash

# NestJS Supabase App - Quick Install Script
# This script automates the installation process

set -e

echo "🚀 NestJS Supabase App - Quick Install"
echo "========================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please update .env with your Supabase credentials:"
    echo "   - DATABASE_URL"
    echo "   - SUPABASE_URL"
    echo "   - SUPABASE_ANON_KEY"
    echo "   - JWT_SECRET (use a strong secret!)"
    echo ""
    read -p "Press Enter after updating .env file..."
fi

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npm run prisma:generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo "✅ Prisma Client generated"
echo ""

# Ask about database setup
echo "📊 Database Setup"
echo "Do you want to run database migrations now?"
echo "Make sure your DATABASE_URL in .env is correct!"
read -p "Run migrations? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Running migrations..."
    npm run prisma:migrate
    
    if [ $? -eq 0 ]; then
        echo "✅ Migrations completed"
        echo ""
        
        # Ask about seeding
        read -p "Seed database with sample data? (y/n): " -n 1 -r
        echo ""
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            npm run prisma:seed
            
            if [ $? -eq 0 ]; then
                echo "✅ Database seeded"
                echo ""
                echo "📝 Test credentials:"
                echo "   Admin: admin@example.com / Admin@123"
                echo "   User: user@example.com / User@123"
            fi
        fi
    else
        echo "❌ Migration failed. Please check your DATABASE_URL"
        exit 1
    fi
fi

echo ""
echo "✅ Installation completed!"
echo ""
echo "🎉 Next steps:"
echo "   1. Start development server: npm run start:dev"
echo "   2. Open API docs: http://localhost:3000/api/docs"
echo "   3. Read documentation: README.md"
echo ""
echo "📚 Quick links:"
echo "   - Quick Start: QUICKSTART.md"
echo "   - Setup Guide: SETUP.md"
echo "   - API Examples: API_EXAMPLES.md"
echo ""
echo "Happy coding! 🚀"

# 🚀 Deployment Guide

Hướng dẫn deploy NestJS Supabase App lên các platforms phổ biến.

## 📋 Pre-deployment Checklist

- [ ] Environment variables đã được cấu hình
- [ ] Database migrations đã chạy
- [ ] Tests đã pass
- [ ] Build thành công locally
- [ ] Security headers đã enable
- [ ] CORS đã cấu hình đúng
- [ ] Rate limiting đã setup
- [ ] Logging đã cấu hình

## 🐳 Docker Deployment

### Build Docker Image

\`\`\`bash
# Build image
docker build -t nestjs-supabase-app:latest .

# Test locally
docker run -p 3000:3000 --env-file .env nestjs-supabase-app:latest
\`\`\`

### Docker Compose

\`\`\`bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
\`\`\`

## ☁️ Cloud Platforms

### 1. Railway

**Bước 1: Install Railway CLI**
\`\`\`bash
npm install -g @railway/cli
\`\`\`

**Bước 2: Login và Deploy**
\`\`\`bash
railway login
railway init
railway up
\`\`\`

**Bước 3: Set Environment Variables**
\`\`\`bash
railway variables set DATABASE_URL="your-database-url"
railway variables set JWT_SECRET="your-jwt-secret"
railway variables set SUPABASE_URL="your-supabase-url"
railway variables set SUPABASE_ANON_KEY="your-anon-key"
\`\`\`

**Bước 4: Run Migrations**
\`\`\`bash
railway run npm run prisma:migrate
\`\`\`

### 2. Render

**Bước 1: Create New Web Service**
1. Connect GitHub repository
2. Select branch (main)
3. Build Command: \`npm install && npm run build && npx prisma generate\`
4. Start Command: \`npm run start:prod\`

**Bước 2: Environment Variables**
Thêm trong Render Dashboard:
\`\`\`
NODE_ENV=production
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
\`\`\`

**Bước 3: Deploy**
- Render sẽ tự động deploy khi push code

### 3. Vercel (Serverless)

**vercel.json:**
\`\`\`json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/main.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/main.js"
    }
  ]
}
\`\`\`

**Deploy:**
\`\`\`bash
npm install -g vercel
vercel login
vercel --prod
\`\`\`

### 4. AWS (EC2)

**Bước 1: Launch EC2 Instance**
- Ubuntu 22.04 LTS
- t2.micro (free tier)
- Security Group: Allow ports 22, 80, 443, 3000

**Bước 2: SSH vào Server**
\`\`\`bash
ssh -i your-key.pem ubuntu@your-ec2-ip
\`\`\`

**Bước 3: Install Dependencies**
\`\`\`bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Git
sudo apt install -y git
\`\`\`

**Bước 4: Clone và Setup**
\`\`\`bash
# Clone repository
git clone https://github.com/your-username/nestjs-supabase-app.git
cd nestjs-supabase-app

# Install dependencies
npm install

# Create .env file
nano .env
# Paste your environment variables

# Generate Prisma Client
npm run prisma:generate

# Build
npm run build
\`\`\`

**Bước 5: Start với PM2**
\`\`\`bash
# Start application
pm2 start dist/main.js --name nestjs-app

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
\`\`\`

**Bước 6: Setup Nginx (Optional)**
\`\`\`bash
# Install Nginx
sudo apt install -y nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/nestjs-app
\`\`\`

**Nginx Configuration:**
\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

\`\`\`bash
# Enable site
sudo ln -s /etc/nginx/sites-available/nestjs-app /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
\`\`\`

**Bước 7: SSL với Let's Encrypt**
\`\`\`bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
\`\`\`

### 5. DigitalOcean App Platform

**Bước 1: Create App**
1. Connect GitHub repository
2. Select branch
3. Auto-detect as Node.js

**Bước 2: Configure**
- Build Command: \`npm install && npm run build && npx prisma generate\`
- Run Command: \`npm run start:prod\`

**Bước 3: Environment Variables**
Add in App Platform dashboard

**Bước 4: Deploy**
- Auto-deploy on push

### 6. Heroku

**Bước 1: Install Heroku CLI**
\`\`\`bash
npm install -g heroku
heroku login
\`\`\`

**Bước 2: Create App**
\`\`\`bash
heroku create your-app-name
\`\`\`

**Bước 3: Add Procfile**
\`\`\`
web: npm run start:prod
\`\`\`

**Bước 4: Set Environment Variables**
\`\`\`bash
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL="your-database-url"
heroku config:set JWT_SECRET="your-jwt-secret"
\`\`\`

**Bước 5: Deploy**
\`\`\`bash
git push heroku main
\`\`\`

**Bước 6: Run Migrations**
\`\`\`bash
heroku run npm run prisma:migrate
\`\`\`

## 🔒 Production Environment Variables

\`\`\`env
# Application
NODE_ENV=production
PORT=3000
API_PREFIX=api/v1

# Database (Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Supabase
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key

# JWT (Use strong secrets!)
JWT_SECRET=your-super-strong-production-jwt-secret-min-32-chars
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=your-super-strong-refresh-secret-min-32-chars
JWT_REFRESH_EXPIRATION=30d

# CORS (Your frontend domains)
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=10

# Logging
LOG_LEVEL=info
\`\`\`

## 📊 Monitoring & Logging

### PM2 Monitoring

\`\`\`bash
# View logs
pm2 logs

# Monitor resources
pm2 monit

# View status
pm2 status
\`\`\`

### Application Logs

Logs được lưu trong \`logs/\` directory:
- \`logs/error.log\` - Error logs
- \`logs/combined.log\` - All logs

### Health Checks

Setup health check endpoints:
- \`GET /api/v1/health\` - Application health
- \`GET /api/v1/health/db\` - Database health

## 🔄 CI/CD Pipeline

### GitHub Actions

File \`.github/workflows/deploy.yml\`:

\`\`\`yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20.x'

      - name: Install dependencies
        run: npm ci

      - name: Generate Prisma Client
        run: npm run prisma:generate

      - name: Run tests
        run: npm run test

      - name: Build
        run: npm run build

      - name: Deploy to Production
        run: |
          # Your deployment script here
          # e.g., railway up, vercel --prod, etc.
\`\`\`

## 🔐 Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong JWT secrets (min 32 characters)
- [ ] Enable CORS with specific origins
- [ ] Enable rate limiting
- [ ] Use Helmet for security headers
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable database connection pooling
- [ ] Setup monitoring and alerts
- [ ] Regular security updates
- [ ] Backup database regularly

## 📈 Performance Optimization

### Database

\`\`\`typescript
// Connection pooling in Prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  pool_timeout = 20
  connection_limit = 10
}
\`\`\`

### Caching (Future)

\`\`\`typescript
// Redis caching
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

CacheModule.register({
  store: redisStore,
  host: 'localhost',
  port: 6379,
});
\`\`\`

## 🆘 Troubleshooting

### Application won't start

1. Check environment variables
2. Verify database connection
3. Check logs: \`pm2 logs\`
4. Verify Prisma Client generated

### Database connection issues

1. Verify DATABASE_URL format
2. Check Supabase project status
3. Verify network/firewall rules
4. Test connection: \`npx prisma db pull\`

### High memory usage

1. Check for memory leaks
2. Optimize database queries
3. Implement caching
4. Scale horizontally

## 📞 Support

- GitHub Issues: [Create Issue](https://github.com/your-repo/issues)
- Documentation: [README.md](./README.md)
- Email: support@yourdomain.com

---

**Happy Deploying! 🚀**

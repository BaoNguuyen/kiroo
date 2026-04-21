# 🚀 NestJS Supabase Application

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

**Production-ready REST API với NestJS, Prisma ORM và Supabase PostgreSQL**

[Quickstart](./QUICKSTART.md) • [Documentation](./SETUP.md) • [Architecture](./ARCHITECTURE.md) • [Deployment](./DEPLOYMENT.md)

</div>

---

## ✨ Tính năng

### 🔐 Authentication & Security
- ✅ JWT-based authentication
- ✅ Role-based access control (USER, ADMIN, MODERATOR)
- ✅ Password hashing với bcrypt
- ✅ Security headers (Helmet)
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Input validation

### 🏗️ Architecture & Code Quality
- ✅ Clean Architecture
- ✅ Domain-Driven Design
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ Git hooks (Husky)
- ✅ Dependency Injection

### 📊 Database & ORM
- ✅ Prisma ORM - Type-safe queries
- ✅ PostgreSQL (Supabase)
- ✅ Migrations & Seeding
- ✅ Connection pooling

### 📚 Documentation & Testing
- ✅ Swagger/OpenAPI docs
- ✅ Comprehensive guides
- ✅ Unit tests (Jest)
- ✅ E2E tests
- ✅ API examples

### 🚀 DevOps & Deployment
- ✅ Docker support
- ✅ Docker Compose
- ✅ GitHub Actions CI/CD
- ✅ Multi-platform deployment guides
- ✅ Health check endpoints

### 📝 Logging & Monitoring
- ✅ Winston logger
- ✅ Error tracking
- ✅ Request logging
- ✅ Performance monitoring ready

### ⚡ Caching & Performance
- ✅ Redis caching (Upstash)
- ✅ Automatic cache invalidation
- ✅ In-memory fallback
- ✅ Configurable TTL

## 📋 Yêu cầu

- Node.js >= 18.x
- npm hoặc yarn
- PostgreSQL (hoặc Supabase account)

## 🛠️ Cài đặt

### 1. Clone và cài đặt dependencies

\`\`\`bash
cd nestjs-supabase-app
npm install
\`\`\`

### 2. Cấu hình môi trường

Tạo file \`.env\` từ \`.env.example\`:

\`\`\`bash
cp .env.example .env
\`\`\`

Cập nhật các biến môi trường trong \`.env\`:

\`\`\`env
# Database URL từ Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase credentials
SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT Secret (đổi thành secret key mạnh)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
\`\`\`

### 3. Setup Prisma

\`\`\`bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio
npm run prisma:studio
\`\`\`

### 4. Chạy ứng dụng

\`\`\`bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
\`\`\`

Ứng dụng sẽ chạy tại: \`http://localhost:3000/api/v1\`

## 📚 API Documentation

Swagger documentation có sẵn tại: \`http://localhost:3000/api/docs\`

## 🔑 API Endpoints

### Authentication

- \`POST /api/v1/auth/register\` - Đăng ký user mới
- \`POST /api/v1/auth/login\` - Đăng nhập

### Users

- \`GET /api/v1/users\` - Lấy danh sách users (Admin only)
- \`GET /api/v1/users/me\` - Lấy thông tin user hiện tại
- \`GET /api/v1/users/:id\` - Lấy user theo ID
- \`PATCH /api/v1/users/:id\` - Cập nhật user
- \`DELETE /api/v1/users/:id\` - Xóa user (Admin only)

### Posts

- \`POST /api/v1/posts\` - Tạo post mới
- \`GET /api/v1/posts\` - Lấy tất cả published posts
- \`GET /api/v1/posts/my-posts\` - Lấy posts của user hiện tại
- \`GET /api/v1/posts/:id\` - Lấy post theo ID
- \`PATCH /api/v1/posts/:id\` - Cập nhật post
- \`DELETE /api/v1/posts/:id\` - Xóa post

### Health

- \`GET /api/v1/health\` - Health check
- \`GET /api/v1/health/db\` - Database health check

## 🧪 Testing

\`\`\`bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
\`\`\`

## 🐳 Docker

\`\`\`bash
# Build và chạy với Docker Compose
docker-compose up -d

# Stop containers
docker-compose down
\`\`\`

## 📁 Cấu trúc dự án

\`\`\`
nestjs-supabase-app/
├── prisma/
│   └── schema.prisma          # Prisma schema
├── src/
│   ├── common/                # Shared utilities
│   │   ├── decorators/        # Custom decorators
│   │   ├── filters/           # Exception filters
│   │   ├── guards/            # Auth guards
│   │   └── interceptors/      # Response interceptors
│   ├── config/                # Configuration files
│   ├── modules/               # Feature modules
│   │   ├── auth/              # Authentication
│   │   ├── users/             # User management
│   │   ├── posts/             # Post management
│   │   └── health/            # Health checks
│   ├── prisma/                # Prisma service
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry point
├── test/                      # Test files
├── .env.example               # Environment variables template
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker Compose configuration
└── package.json               # Dependencies
\`\`\`

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **JWT** - Token-based authentication
- **Password Hashing** - Bcrypt encryption
- **Input Validation** - DTO validation
- **SQL Injection Protection** - Prisma ORM

## 🎯 Best Practices

- ✅ Clean Architecture (Controllers → Services → Repositories)
- ✅ DTOs cho validation
- ✅ Global exception handling
- ✅ Logging với Winston
- ✅ Environment validation
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ Git hooks với Husky

## 📝 Scripts

\`\`\`bash
npm run build          # Build production
npm run start          # Start production
npm run start:dev      # Start development
npm run lint           # Run ESLint
npm run format         # Format code với Prettier
npm run prisma:generate # Generate Prisma Client
npm run prisma:migrate  # Run migrations
npm run prisma:studio   # Open Prisma Studio
\`\`\`

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

MIT License

## 👨‍💻 Author

Được tạo bởi Senior Developer với ❤️

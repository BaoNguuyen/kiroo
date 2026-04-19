# ⚡ Quick Start Guide

## 🚀 Chạy dự án trong 5 phút

### Bước 1: Cài đặt (1 phút)

\`\`\`bash
cd nestjs-supabase-app
npm install
\`\`\`

### Bước 2: Setup Database (2 phút)

**Option A: Sử dụng Local PostgreSQL**

\`\`\`bash
# Chạy PostgreSQL với Docker
docker-compose up -d postgres

# File .env đã có sẵn config cho local
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestjs_db"
\`\`\`

**Option B: Sử dụng Supabase (Recommended)**

1. Tạo account tại [supabase.com](https://supabase.com)
2. Tạo project mới
3. Copy credentials vào file \`.env\`:

\`\`\`env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=your-anon-key
\`\`\`

### Bước 3: Setup Prisma (1 phút)

\`\`\`bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database với data mẫu
npm run prisma:seed
\`\`\`

### Bước 4: Chạy App (1 phút)

\`\`\`bash
npm run start:dev
\`\`\`

✅ **Done!** App đang chạy tại:
- API: http://localhost:3000/api/v1
- Swagger: http://localhost:3000/api/docs

---

## 🧪 Test API ngay

### 1. Mở Swagger UI

Truy cập: http://localhost:3000/api/docs

### 2. Test Login với account có sẵn

**Admin Account:**
- Email: \`admin@example.com\`
- Password: \`Admin@123\`

**User Account:**
- Email: \`user@example.com\`
- Password: \`User@123\`

### 3. Test với cURL

**Login:**
\`\`\`bash
curl -X POST http://localhost:3000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"admin@example.com","password":"Admin@123"}'
\`\`\`

**Get Profile:**
\`\`\`bash
curl http://localhost:3000/api/v1/users/me \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
\`\`\`

---

## 📁 Cấu trúc quan trọng

\`\`\`
nestjs-supabase-app/
├── src/
│   ├── modules/
│   │   ├── auth/          # Authentication
│   │   ├── users/         # User management
│   │   ├── posts/         # Posts CRUD
│   │   └── health/        # Health checks
│   ├── common/            # Shared utilities
│   ├── config/            # Configuration
│   └── prisma/            # Database service
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── .env                   # Environment variables
└── README.md              # Full documentation
\`\`\`

---

## 🎯 Các lệnh thường dùng

\`\`\`bash
# Development
npm run start:dev          # Start với hot reload

# Database
npm run prisma:studio      # Open Prisma Studio (GUI)
npm run prisma:migrate     # Run migrations
npm run prisma:seed        # Seed database

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run e2e tests

# Production
npm run build              # Build for production
npm run start:prod         # Start production server
\`\`\`

---

## 🔑 API Endpoints chính

### Authentication
- \`POST /api/v1/auth/register\` - Đăng ký
- \`POST /api/v1/auth/login\` - Đăng nhập

### Users
- \`GET /api/v1/users/me\` - Profile hiện tại
- \`GET /api/v1/users\` - Danh sách users (Admin)
- \`PATCH /api/v1/users/:id\` - Update user

### Posts
- \`POST /api/v1/posts\` - Tạo post
- \`GET /api/v1/posts\` - Danh sách posts
- \`GET /api/v1/posts/my-posts\` - Posts của mình
- \`PATCH /api/v1/posts/:id\` - Update post
- \`DELETE /api/v1/posts/:id\` - Xóa post

### Health
- \`GET /api/v1/health\` - Health check
- \`GET /api/v1/health/db\` - Database check

---

## 🐛 Troubleshooting

### Port 3000 đã được sử dụng?

Đổi PORT trong \`.env\`:
\`\`\`env
PORT=3001
\`\`\`

### Không connect được database?

Kiểm tra \`DATABASE_URL\` trong \`.env\` đúng format.

### Prisma Client chưa được generate?

\`\`\`bash
npm run prisma:generate
\`\`\`

---

## 📚 Đọc thêm

- [README.md](./README.md) - Full documentation
- [SETUP.md](./SETUP.md) - Chi tiết setup
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Kiến trúc dự án

---

## 🎉 Next Steps

1. ✅ Explore Swagger UI
2. ✅ Test các API endpoints
3. ✅ Xem Prisma Studio: \`npm run prisma:studio\`
4. ✅ Đọc code trong \`src/modules/\`
5. ✅ Customize theo nhu cầu của bạn

**Happy Coding! 🚀**

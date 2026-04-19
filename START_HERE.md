# 🎯 START HERE - Bắt đầu từ đây!

Chào mừng bạn đến với **NestJS Supabase App**! 🎉

Đây là hướng dẫn đầu tiên để bạn bắt đầu với dự án này.

## 📚 Bạn nên đọc gì trước?

### 🚀 Nếu bạn muốn chạy ngay (5 phút)
👉 Đọc [QUICKSTART.md](./QUICKSTART.md)

### 📖 Nếu bạn muốn hiểu chi tiết setup
👉 Đọc [SETUP.md](./SETUP.md)

### 🏗️ Nếu bạn muốn hiểu kiến trúc
👉 Đọc [ARCHITECTURE.md](./ARCHITECTURE.md)

### 🚢 Nếu bạn muốn deploy production
👉 Đọc [DEPLOYMENT.md](./DEPLOYMENT.md)

### 🤝 Nếu bạn muốn contribute
👉 Đọc [CONTRIBUTING.md](./CONTRIBUTING.md)

### 📊 Nếu bạn muốn overview tổng quan
👉 Đọc [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

## ⚡ Quick Start (TL;DR)

\`\`\`bash
# 1. Cài đặt
cd nestjs-supabase-app
npm install

# 2. Setup database
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# 3. Chạy app
npm run start:dev

# 4. Mở browser
# API: http://localhost:3000/api/v1
# Docs: http://localhost:3000/api/docs
\`\`\`

## 🎓 Dành cho người mới bắt đầu

### Bước 1: Hiểu dự án này làm gì
Đây là một **REST API** hoàn chỉnh với:
- ✅ Đăng ký/Đăng nhập users
- ✅ Quản lý users và roles
- ✅ CRUD posts
- ✅ Authentication & Authorization
- ✅ API documentation tự động

### Bước 2: Cài đặt môi trường
Bạn cần:
- Node.js 18+ ([Download](https://nodejs.org))
- npm hoặc yarn
- PostgreSQL hoặc Supabase account ([Free](https://supabase.com))

### Bước 3: Clone và cài đặt
\`\`\`bash
cd nestjs-supabase-app
npm install
\`\`\`

### Bước 4: Setup database
**Option A: Local PostgreSQL**
\`\`\`bash
docker-compose up -d postgres
\`\`\`

**Option B: Supabase (Recommended)**
1. Tạo account tại [supabase.com](https://supabase.com)
2. Tạo project mới
3. Copy credentials vào \`.env\`

### Bước 5: Chạy migrations
\`\`\`bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
\`\`\`

### Bước 6: Start app
\`\`\`bash
npm run start:dev
\`\`\`

### Bước 7: Test API
Mở http://localhost:3000/api/docs

Login với:
- Email: \`admin@example.com\`
- Password: \`Admin@123\`

## 🎯 Dành cho Senior Developers

### Tech Stack
- NestJS 10 + TypeScript 5
- Prisma ORM + PostgreSQL
- JWT Authentication
- Swagger/OpenAPI
- Docker ready

### Architecture
- Clean Architecture
- Domain-Driven Design
- Repository Pattern
- Dependency Injection

### Key Features
- Role-based access control
- Global exception handling
- Request validation (DTOs)
- Winston logging
- Security (Helmet, CORS, Rate limiting)
- Unit & E2E tests
- CI/CD ready

### Quick Commands
\`\`\`bash
npm run start:dev          # Dev mode
npm run prisma:studio      # Database GUI
npm run test               # Run tests
npm run lint               # Lint code
npm run build              # Build production
\`\`\`

## 📁 Cấu trúc quan trọng

\`\`\`
src/
├── modules/
│   ├── auth/          # JWT authentication
│   ├── users/         # User CRUD + roles
│   ├── posts/         # Posts CRUD
│   └── health/        # Health checks
├── common/
│   ├── decorators/    # @CurrentUser, @Roles, etc.
│   ├── guards/        # JwtAuthGuard, RolesGuard
│   ├── filters/       # Exception handling
│   └── interceptors/  # Response transformation
├── config/            # Environment validation
└── prisma/            # Database service
\`\`\`

## 🔑 Environment Variables

File \`.env\` đã có sẵn với config mặc định.

**Quan trọng cần thay đổi:**
- \`DATABASE_URL\` - Supabase connection string
- \`JWT_SECRET\` - Strong secret key
- \`SUPABASE_URL\` - Your Supabase project URL
- \`SUPABASE_ANON_KEY\` - Your Supabase anon key

## 🧪 Testing

\`\`\`bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
\`\`\`

## 📚 API Documentation

Sau khi start app, truy cập:
- **Swagger UI**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/v1/health

## 🎨 Customize dự án

### Thêm module mới
\`\`\`bash
nest g resource modules/products
\`\`\`

### Thêm model trong Prisma
Edit \`prisma/schema.prisma\`, sau đó:
\`\`\`bash
npx prisma migrate dev --name add_products
\`\`\`

### Thêm authentication cho endpoint
\`\`\`typescript
@UseGuards(JwtAuthGuard)
@Get('protected')
protectedRoute() {
  return 'This is protected';
}
\`\`\`

### Thêm role-based access
\`\`\`typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Get('admin-only')
adminRoute() {
  return 'Admin only';
}
\`\`\`

## 🐛 Gặp vấn đề?

### Port 3000 đã được sử dụng
Đổi PORT trong \`.env\`:
\`\`\`env
PORT=3001
\`\`\`

### Không connect được database
1. Kiểm tra \`DATABASE_URL\` trong \`.env\`
2. Verify Supabase project đang chạy
3. Test connection: \`npx prisma db pull\`

### Prisma Client lỗi
\`\`\`bash
npm run prisma:generate
\`\`\`

### Dependencies lỗi
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

## 💡 Tips & Tricks

### 1. Sử dụng Prisma Studio
\`\`\`bash
npm run prisma:studio
\`\`\`
Mở GUI để xem và edit database trực tiếp.

### 2. Watch mode cho tests
\`\`\`bash
npm run test:watch
\`\`\`

### 3. Debug mode
\`\`\`bash
npm run start:debug
\`\`\`
Attach debugger tại port 9229.

### 4. Format code tự động
\`\`\`bash
npm run format
\`\`\`

### 5. Check logs
Logs được lưu trong \`logs/\` directory.

## 🎓 Learning Path

### Beginner
1. ✅ Chạy dự án thành công
2. ✅ Test API với Swagger
3. ✅ Hiểu cấu trúc folders
4. ✅ Đọc code trong \`src/modules/\`

### Intermediate
1. ✅ Thêm module mới
2. ✅ Customize Prisma schema
3. ✅ Thêm validation rules
4. ✅ Write unit tests

### Advanced
1. ✅ Implement caching (Redis)
2. ✅ Add background jobs
3. ✅ Setup monitoring
4. ✅ Deploy to production

## 🚀 Next Steps

Sau khi chạy thành công:

1. **Explore API**
   - Mở Swagger UI
   - Test các endpoints
   - Xem request/response format

2. **Đọc Code**
   - Bắt đầu từ \`src/main.ts\`
   - Xem \`src/modules/auth/\`
   - Hiểu flow authentication

3. **Customize**
   - Thêm fields vào User model
   - Tạo module mới
   - Implement business logic

4. **Deploy**
   - Đọc [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Choose platform (Railway, Render, AWS, etc.)
   - Deploy và test production

## 📞 Cần giúp đỡ?

- 📖 Đọc [README.md](./README.md) - Full documentation
- 🏗️ Đọc [ARCHITECTURE.md](./ARCHITECTURE.md) - Hiểu kiến trúc
- 🐛 [Create Issue](https://github.com/your-repo/issues) - Report bugs
- 💬 [Discussions](https://github.com/your-repo/discussions) - Ask questions

## ⭐ Thích dự án này?

- ⭐ Star trên GitHub
- 🍴 Fork và customize
- 🤝 Contribute code
- 📢 Share với bạn bè

---

**Happy Coding! 🎉**

Bắt đầu với [QUICKSTART.md](./QUICKSTART.md) ngay bây giờ! 🚀

# 🚀 Hướng dẫn Setup Chi tiết

## Bước 1: Cài đặt Dependencies

\`\`\`bash
cd nestjs-supabase-app
npm install
\`\`\`

## Bước 2: Setup Supabase

### 2.1. Tạo Supabase Project

1. Truy cập [https://supabase.com](https://supabase.com)
2. Đăng ký/Đăng nhập
3. Tạo project mới
4. Chọn region gần nhất
5. Đặt database password (lưu lại password này)

### 2.2. Lấy Credentials

Sau khi project được tạo:

1. Vào **Settings** → **API**
2. Copy các thông tin sau:
   - **Project URL** (SUPABASE_URL)
   - **anon/public key** (SUPABASE_ANON_KEY)
   - **service_role key** (SUPABASE_SERVICE_ROLE_KEY)

3. Vào **Settings** → **Database**
4. Copy **Connection string** → **URI**
   - Format: \`postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres\`
   - Thay \`[YOUR-PASSWORD]\` bằng password bạn đã đặt

### 2.3. Cập nhật file .env

Mở file \`.env\` và cập nhật:

\`\`\`env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
\`\`\`

## Bước 3: Setup Database với Prisma

\`\`\`bash
# Generate Prisma Client
npm run prisma:generate

# Tạo và chạy migrations
npm run prisma:migrate

# Seed database với dữ liệu mẫu
npm run prisma:seed
\`\`\`

## Bước 4: Chạy Application

\`\`\`bash
# Development mode với hot reload
npm run start:dev
\`\`\`

Ứng dụng sẽ chạy tại:
- API: \`http://localhost:3000/api/v1\`
- Swagger Docs: \`http://localhost:3000/api/docs\`

## Bước 5: Test API

### 5.1. Sử dụng Swagger UI

Truy cập \`http://localhost:3000/api/docs\` và test các endpoints.

### 5.2. Test với cURL hoặc Postman

**Register User:**
\`\`\`bash
curl -X POST http://localhost:3000/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "test@example.com",
    "password": "Test@123",
    "firstName": "Test",
    "lastName": "User"
  }'
\`\`\`

**Login:**
\`\`\`bash
curl -X POST http://localhost:3000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "test@example.com",
    "password": "Test@123"
  }'
\`\`\`

Copy \`access_token\` từ response.

**Get Profile (với JWT token):**
\`\`\`bash
curl -X GET http://localhost:3000/api/v1/users/me \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
\`\`\`

## Bước 6: Development Workflow

### Thêm Model mới trong Prisma

1. Sửa \`prisma/schema.prisma\`
2. Chạy migration:
   \`\`\`bash
   npx prisma migrate dev --name add_new_model
   \`\`\`

### Tạo Module mới

\`\`\`bash
# Tạo resource hoàn chỉnh (module, controller, service)
nest g resource modules/products
\`\`\`

### Format Code

\`\`\`bash
npm run format
npm run lint
\`\`\`

## Bước 7: Production Deployment

### 7.1. Build Application

\`\`\`bash
npm run build
\`\`\`

### 7.2. Deploy với Docker

\`\`\`bash
# Build image
docker build -t nestjs-app .

# Run container
docker run -p 3000:3000 --env-file .env nestjs-app
\`\`\`

### 7.3. Deploy lên Cloud

**Vercel/Railway/Render:**
1. Connect GitHub repository
2. Set environment variables
3. Deploy

**AWS/GCP/Azure:**
1. Setup container registry
2. Push Docker image
3. Deploy to container service

## 🔧 Troubleshooting

### Lỗi: "Can't reach database server"

- Kiểm tra DATABASE_URL đúng format
- Kiểm tra Supabase project đang chạy
- Kiểm tra firewall/network

### Lỗi: "Prisma Client not generated"

\`\`\`bash
npm run prisma:generate
\`\`\`

### Lỗi: "Port 3000 already in use"

Đổi PORT trong \`.env\`:
\`\`\`env
PORT=3001
\`\`\`

## 📚 Tài liệu tham khảo

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)

## 🎯 Next Steps

1. ✅ Customize Prisma schema theo nhu cầu
2. ✅ Thêm các modules mới
3. ✅ Setup CI/CD pipeline
4. ✅ Thêm unit tests
5. ✅ Setup monitoring và logging
6. ✅ Implement caching (Redis)
7. ✅ Add file upload (Supabase Storage)
8. ✅ Setup email service

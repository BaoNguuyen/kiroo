# 🔧 Fix Installation Issues

## Vấn đề: Prisma engines download failed

Lỗi này xảy ra do:
1. Network connection bị gián đoạn khi download Prisma engines
2. Windows file locking issues
3. Antivirus blocking

## ✅ Giải pháp

### Cách 1: Retry với clean install (Recommended)

**Bước 1: Xóa node_modules và cache**
\`\`\`bash
# Trong Git Bash hoặc CMD
rm -rf node_modules
rm -rf package-lock.json
npm cache clean --force
\`\`\`

**Bước 2: Cài lại**
\`\`\`bash
npm install
\`\`\`

### Cách 2: Install từng bước

**Bước 1: Install dependencies không có Prisma**
\`\`\`bash
npm install --ignore-scripts
\`\`\`

**Bước 2: Install Prisma riêng**
\`\`\`bash
npm install prisma @prisma/client --save-dev
\`\`\`

**Bước 3: Generate Prisma Client**
\`\`\`bash
npx prisma generate
\`\`\`

### Cách 3: Sử dụng Yarn thay vì npm

\`\`\`bash
# Install Yarn nếu chưa có
npm install -g yarn

# Xóa node_modules
rm -rf node_modules

# Install với Yarn
yarn install
\`\`\`

### Cách 4: Set Prisma binary target manually

Tạo file \`.npmrc\` trong thư mục dự án:

\`\`\`
# .npmrc
prisma_engines_checksum_ignore_missing=true
\`\`\`

Sau đó:
\`\`\`bash
npm install
\`\`\`

### Cách 5: Tắt Antivirus tạm thời

Một số antivirus (Windows Defender, Avast, etc.) có thể block Prisma engines download.

1. Tắt antivirus tạm thời
2. Chạy \`npm install\`
3. Bật lại antivirus

### Cách 6: Sử dụng VPN hoặc đổi DNS

Nếu vấn đề là network:

\`\`\`bash
# Thử với registry khác
npm config set registry https://registry.npmjs.org/
npm install
\`\`\`

## 🚀 Quick Fix Script

Tạo file \`fix-install.bat\` (Windows):

\`\`\`batch
@echo off
echo Cleaning up...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

echo Clearing npm cache...
call npm cache clean --force

echo Installing dependencies...
call npm install --ignore-scripts

echo Installing Prisma...
call npm install prisma @prisma/client

echo Generating Prisma Client...
call npx prisma generate

echo Done!
pause
\`\`\`

Chạy file này:
\`\`\`bash
fix-install.bat
\`\`\`

## 🐧 Hoặc sử dụng Git Bash (Recommended)

\`\`\`bash
#!/bin/bash

echo "🧹 Cleaning up..."
rm -rf node_modules package-lock.json

echo "🗑️ Clearing npm cache..."
npm cache clean --force

echo "📦 Installing dependencies (without scripts)..."
npm install --ignore-scripts

echo "🔧 Installing Prisma..."
npm install prisma @prisma/client

echo "⚙️ Generating Prisma Client..."
npx prisma generate

echo "✅ Done! Now run: npm run start:dev"
\`\`\`

## ⚡ Nếu vẫn lỗi

### Option A: Skip Prisma tạm thời

1. Comment out Prisma trong \`package.json\`:
\`\`\`json
{
  "dependencies": {
    // "@prisma/client": "^5.8.0",
  },
  "devDependencies": {
    // "prisma": "^5.8.0",
  }
}
\`\`\`

2. Install:
\`\`\`bash
npm install
\`\`\`

3. Uncomment và install Prisma riêng:
\`\`\`bash
npm install prisma @prisma/client
\`\`\`

### Option B: Sử dụng Docker

Nếu local install không được, dùng Docker:

\`\`\`bash
# Build Docker image
docker-compose build

# Run container
docker-compose up
\`\`\`

### Option C: Downgrade Prisma version

Thử version cũ hơn trong \`package.json\`:

\`\`\`json
{
  "dependencies": {
    "@prisma/client": "^5.0.0"
  },
  "devDependencies": {
    "prisma": "^5.0.0"
  }
}
\`\`\`

## 📝 Sau khi fix xong

\`\`\`bash
# Verify installation
npm list prisma
npm list @prisma/client

# Generate Prisma Client
npm run prisma:generate

# Test
npm run start:dev
\`\`\`

## 🆘 Vẫn không được?

Thử cài đặt minimal version:

\`\`\`bash
# 1. Install core dependencies only
npm install @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata rxjs

# 2. Install Prisma
npm install prisma @prisma/client

# 3. Install remaining dependencies
npm install
\`\`\`

## 💡 Tips

1. **Đảm bảo có kết nối internet ổn định**
2. **Tắt VPN nếu đang bật**
3. **Chạy terminal với quyền Administrator**
4. **Kiểm tra firewall/antivirus**
5. **Thử trên Git Bash thay vì PowerShell**

## ✅ Recommended Solution (Fastest)

\`\`\`bash
# Trong Git Bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
\`\`\`

Nếu vẫn lỗi:
\`\`\`bash
npm install --ignore-scripts
npx prisma generate
\`\`\`

---

**Sau khi cài đặt thành công, chạy:**
\`\`\`bash
npm run start:dev
\`\`\`

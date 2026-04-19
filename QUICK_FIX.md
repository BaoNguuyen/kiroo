# ⚡ QUICK FIX - Prisma Installation Issue

## 🎯 Giải pháp nhanh nhất

Chạy các lệnh này **từng dòng một** trong Git Bash:

\`\`\`bash
# 1. Xóa node_modules
rm -rf node_modules package-lock.json

# 2. Install WITHOUT running postinstall scripts
npm install --ignore-scripts

# 3. Download Prisma engines manually
npx prisma -v

# 4. Generate Prisma Client
npx prisma generate
\`\`\`

## ✅ Nếu thành công

Bạn sẽ thấy:
\`\`\`
✔ Generated Prisma Client
\`\`\`

Tiếp tục:
\`\`\`bash
# Setup database
npm run prisma:migrate

# Seed data
npm run prisma:seed

# Start app
npm run start:dev
\`\`\`

## ❌ Nếu vẫn lỗi

### Option 1: Set Prisma binary target

\`\`\`bash
# Set environment variable
export PRISMA_ENGINES_MIRROR=https://binaries.prisma.sh

# Try again
npx prisma generate
\`\`\`

### Option 2: Download engines manually

\`\`\`bash
# Download specific engine
npx prisma version

# This will trigger download
\`\`\`

### Option 3: Use different Prisma version

Edit \`package.json\`:
\`\`\`json
{
  "dependencies": {
    "@prisma/client": "5.0.0"
  },
  "devDependencies": {
    "prisma": "5.0.0"
  }
}
\`\`\`

Then:
\`\`\`bash
npm install --ignore-scripts
npx prisma generate
\`\`\`

## 🔥 Nuclear Option (Always works)

\`\`\`bash
# 1. Install everything except Prisma
npm install --ignore-scripts

# 2. Install Prisma globally
npm install -g prisma

# 3. Use global Prisma
prisma generate

# 4. Install local Prisma client only
npm install @prisma/client --save
\`\`\`

## 💡 Root Cause

Lỗi \`ECONNRESET\` nghĩa là:
- Kết nối internet bị gián đoạn khi download Prisma engines
- Firewall/Antivirus đang block
- DNS issue

## 🛠️ Permanent Fix

Thêm vào \`.npmrc\`:
\`\`\`
prisma_engines_checksum_ignore_missing=true
prisma_skip_postinstall_generate=true
\`\`\`

Sau đó luôn chạy \`npx prisma generate\` manually.

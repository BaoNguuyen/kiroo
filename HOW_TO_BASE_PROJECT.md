# 🏗️ Cách Base Dự Án NestJS Supabase

## 🎯 Tổng quan

Dự án này được xây dựng **từ đầu** (from scratch) với các best practices của NestJS và production-ready features. Đây là hướng dẫn chi tiết để bạn có thể base theo hoặc tạo tương tự.

## 📋 Bước 1: Khởi tạo NestJS Project

### Cách 1: Sử dụng NestJS CLI (Recommended)

\`\`\`bash
# Install NestJS CLI globally
npm install -g @nestjs/cli

# Create new project
nest new my-project-name

# Choose package manager (npm/yarn/pnpm)
cd my-project-name
\`\`\`

### Cách 2: Clone template này

\`\`\`bash
# Clone dự án này
git clone <repository-url>
cd nestjs-supabase-app

# Install dependencies
npm install

# Copy và customize
cp -r . ../my-new-project
cd ../my-new-project

# Update package.json
# Đổi tên project, description, author, etc.
\`\`\`

## 📦 Bước 2: Cài đặt Dependencies

### Core Dependencies

\`\`\`bash
# NestJS Core
npm install @nestjs/common @nestjs/core @nestjs/platform-express

# Configuration
npm install @nestjs/config

# Database (Prisma + Supabase)
npm install prisma @prisma/client

# Authentication
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install --save-dev @types/passport-jwt @types/bcrypt

# Validation
npm install class-validator class-transformer

# Documentation
npm install @nestjs/swagger

# Security
npm install helmet @nestjs/throttler

# Logging
npm install winston nest-winston

# Caching (Redis)
npm install @nestjs/cache-manager cache-manager cache-manager-redis-yet ioredis
npm install --save-dev @types/cache-manager

# Testing
npm install --save-dev @nestjs/testing jest supertest @types/jest @types/supertest

# Development Tools
npm install --save-dev eslint prettier husky lint-staged
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
\`\`\`

## 🏗️ Bước 3: Cấu trúc Thư mục

Tạo cấu trúc thư mục như sau:

\`\`\`
src/
├── common/                 # Shared utilities
│   ├── decorators/         # Custom decorators
│   │   ├── current-user.decorator.ts
│   │   ├── roles.decorator.ts
│   │   ├── public.decorator.ts
│   │   ├── cache-ttl.decorator.ts
│   │   └── cache-key.decorator.ts
│   ├── filters/            # Exception filters
│   │   └── http-exception.filter.ts
│   ├── guards/             # Auth guards
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   └── interceptors/       # Response interceptors
│       └── transform.interceptor.ts
├── config/                 # Configuration files
│   ├── env.validation.ts
│   ├── winston.config.ts
│   └── redis.config.ts
├── modules/                # Feature modules
│   ├── auth/               # Authentication
│   │   ├── dto/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/              # User management
│   │   ├── dto/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── posts/              # Posts (example feature)
│   └── health/             # Health checks
├── prisma/                 # Database service
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── app.module.ts           # Root module
└── main.ts                 # Application entry point
\`\`\`

## 🗄️ Bước 4: Setup Database (Prisma + Supabase)

### 4.1. Initialize Prisma

\`\`\`bash
npx prisma init
\`\`\`

### 4.2. Configure Prisma Schema

File \`prisma/schema.prisma\`:

\`\`\`prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  firstName String?  @map("first_name")
  lastName  String?  @map("last_name")
  role      Role     @default(USER)
  isActive  Boolean  @default(true) @map("is_active")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  posts    Post[]
  profile  Profile?

  @@map("users")
}

model Profile {
  id        String   @id @default(uuid())
  bio       String?
  avatar    String?
  phone     String?
  userId    String   @unique @map("user_id")
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("profiles")
}

model Post {
  id          String   @id @default(uuid())
  title       String
  content     String
  published   Boolean  @default(false)
  authorId    String   @map("author_id")
  author      User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("posts")
}

enum Role {
  USER
  ADMIN
  MODERATOR
}
\`\`\`

### 4.3. Setup Supabase

1. Tạo account tại [supabase.com](https://supabase.com)
2. Tạo project mới
3. Copy DATABASE_URL từ Settings → Database

### 4.4. Environment Variables

File \`.env\`:

\`\`\`env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database (Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Supabase
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=7d

# Redis (Optional)
REDIS_URL=redis://localhost:6379
REDIS_TTL=3600

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=10

# Logging
LOG_LEVEL=debug
\`\`\`

## 🔧 Bước 5: Core Files Setup

### 5.1. Main Application (src/main.ts)

\`\`\`typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN')?.split(',') || '*',
    credentials: true,
  });

  // Global prefix
  const apiPrefix = configService.get('API_PREFIX') || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  console.log(\`🚀 Application is running on: http://localhost:\${port}/\${apiPrefix}\`);
  console.log(\`📚 Swagger documentation: http://localhost:\${port}/api/docs\`);
}

bootstrap();
\`\`\`

### 5.2. App Module (src/app.module.ts)

\`\`\`typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { HealthModule } from './modules/health/health.module';

import { validate } from './config/env.validation';
import { RedisConfigService } from './config/redis.config';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: '.env',
    }),

    // Redis Cache
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: RedisConfigService,
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    // Database
    PrismaModule,

    // Feature modules
    AuthModule,
    UsersModule,
    PostsModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
\`\`\`

## 🔐 Bước 6: Authentication Setup

### 6.1. JWT Strategy

\`\`\`typescript
// src/modules/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
\`\`\`

### 6.2. Auth Guard

\`\`\`typescript
// src/common/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
\`\`\`

## 📝 Bước 7: Generate Modules

Sử dụng NestJS CLI để generate modules:

\`\`\`bash
# Generate Auth module
nest g module modules/auth
nest g controller modules/auth
nest g service modules/auth

# Generate Users module
nest g module modules/users
nest g controller modules/users
nest g service modules/users

# Generate Posts module
nest g module modules/posts
nest g controller modules/posts
nest g service modules/posts

# Generate Health module
nest g module modules/health
nest g controller modules/health
nest g service modules/health
\`\`\`

## 🧪 Bước 8: Testing Setup

### 8.1. Jest Configuration

File \`jest.config.js\`:

\`\`\`javascript
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
\`\`\`

### 8.2. Fix Jest Types

Trong file test, thêm import:

\`\`\`typescript
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
\`\`\`

Hoặc cài đặt types:

\`\`\`bash
npm install --save-dev @types/jest
\`\`\`

## 🐳 Bước 9: Docker Setup

### 9.1. Dockerfile

\`\`\`dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3000
CMD ["node", "dist/main"]
\`\`\`

### 9.2. Docker Compose

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
      - JWT_SECRET=\${JWT_SECRET}
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=myapp_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
\`\`\`

## 🚀 Bước 10: Development Workflow

### 10.1. Package.json Scripts

\`\`\`json
{
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \\"src/**/*.ts\\" \\"test/**/*.ts\\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \\"{src,apps,libs,test}/**/*.ts\\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "prisma:seed": "ts-node prisma/seed.ts"
  }
}
\`\`\`

### 10.2. Development Commands

\`\`\`bash
# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start development server
npm run start:dev

# Run tests
npm run test

# Build for production
npm run build
\`\`\`

## 📚 Bước 11: Documentation

Tạo các file documentation:

- \`README.md\` - Main documentation
- \`QUICKSTART.md\` - Quick start guide
- \`SETUP.md\` - Detailed setup
- \`ARCHITECTURE.md\` - Architecture overview
- \`DEPLOYMENT.md\` - Deployment guides
- \`API_EXAMPLES.md\` - API usage examples

## 🎯 Kết luận

Đây là cách tôi base dự án này:

1. **Bắt đầu từ NestJS CLI** - \`nest new project-name\`
2. **Thêm dependencies** theo từng category (auth, database, validation, etc.)
3. **Setup Prisma + Supabase** cho database
4. **Tạo cấu trúc thư mục** theo Clean Architecture
5. **Implement authentication** với JWT
6. **Thêm caching** với Redis
7. **Setup testing** với Jest
8. **Add Docker support**
9. **Viết documentation** chi tiết

## 🔄 Để Base Dự Án Này

### Option 1: Clone và Customize

\`\`\`bash
git clone <this-repo>
cd nestjs-supabase-app
npm install

# Customize
# - Update package.json (name, description, author)
# - Update .env với credentials của bạn
# - Customize Prisma schema
# - Add/remove modules theo nhu cầu
\`\`\`

### Option 2: Tạo Mới Theo Hướng Dẫn

Follow các bước 1-11 ở trên để tạo từ đầu.

### Option 3: Sử dụng Template

Tôi có thể tạo một NestJS template/boilerplate để bạn dễ dàng base cho các dự án khác.

---

**Bạn muốn tôi giải thích thêm phần nào không?** 🤔
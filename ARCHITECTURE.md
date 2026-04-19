# 🏗️ Kiến trúc Dự án

## Tổng quan

Dự án này được xây dựng theo **Clean Architecture** và **Domain-Driven Design (DDD)** principles, đảm bảo code dễ maintain, test và scale.

## Cấu trúc Layers

\`\`\`
┌─────────────────────────────────────┐
│     Presentation Layer              │
│  (Controllers, DTOs, Guards)        │
├─────────────────────────────────────┤
│     Application Layer               │
│  (Services, Use Cases)              │
├─────────────────────────────────────┤
│     Domain Layer                    │
│  (Entities, Business Logic)         │
├─────────────────────────────────────┤
│     Infrastructure Layer            │
│  (Prisma, Database, External APIs)  │
└─────────────────────────────────────┘
\`\`\`

## Chi tiết Layers

### 1. Presentation Layer (Controllers)

**Trách nhiệm:**
- Nhận HTTP requests
- Validate input (DTOs)
- Gọi services
- Trả về HTTP responses

**Ví dụ:**
\`\`\`typescript
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
\`\`\`

### 2. Application Layer (Services)

**Trách nhiệm:**
- Business logic
- Orchestrate use cases
- Transaction management
- Error handling

**Ví dụ:**
\`\`\`typescript
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();
    return user;
  }
}
\`\`\`

### 3. Domain Layer (Entities)

**Trách nhiệm:**
- Domain models (Prisma schema)
- Business rules
- Domain events

**Ví dụ:**
\`\`\`prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  role      Role     @default(USER)
  posts     Post[]
}
\`\`\`

### 4. Infrastructure Layer (Prisma)

**Trách nhiệm:**
- Database access
- External API calls
- File storage
- Caching

**Ví dụ:**
\`\`\`typescript
@Injectable()
export class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}
\`\`\`

## Design Patterns

### 1. Dependency Injection

NestJS sử dụng DI container để manage dependencies:

\`\`\`typescript
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
}
\`\`\`

### 2. Repository Pattern

Prisma Service hoạt động như Repository:

\`\`\`typescript
// Service sử dụng Prisma như repository
async findAll() {
  return this.prisma.user.findMany();
}
\`\`\`

### 3. DTO Pattern

Data Transfer Objects cho validation:

\`\`\`typescript
export class CreateUserDto {
  @IsEmail()
  email: string;
  
  @MinLength(8)
  password: string;
}
\`\`\`

### 4. Guard Pattern

Authentication và Authorization:

\`\`\`typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Get('admin')
adminOnly() {}
\`\`\`

### 5. Interceptor Pattern

Transform responses:

\`\`\`typescript
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context, next) {
    return next.handle().pipe(
      map(data => ({ data, statusCode, timestamp }))
    );
  }
}
\`\`\`

### 6. Filter Pattern

Global error handling:

\`\`\`typescript
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host) {
    // Handle all exceptions
  }
}
\`\`\`

## Module Organization

### Feature Modules

Mỗi feature là một module độc lập:

\`\`\`
modules/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/
│   └── strategies/
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
└── posts/
    ├── posts.module.ts
    ├── posts.controller.ts
    ├── posts.service.ts
    └── dto/
\`\`\`

### Shared Modules

Code dùng chung:

\`\`\`
common/
├── decorators/      # Custom decorators
├── filters/         # Exception filters
├── guards/          # Auth guards
├── interceptors/    # Response interceptors
└── pipes/           # Validation pipes
\`\`\`

## Data Flow

### Request Flow

\`\`\`
1. HTTP Request
   ↓
2. Middleware (CORS, Helmet, Rate Limit)
   ↓
3. Guards (Authentication, Authorization)
   ↓
4. Interceptors (Before)
   ↓
5. Pipes (Validation, Transformation)
   ↓
6. Controller (Route Handler)
   ↓
7. Service (Business Logic)
   ↓
8. Prisma (Database)
   ↓
9. Service (Process Result)
   ↓
10. Controller (Return)
    ↓
11. Interceptors (After - Transform)
    ↓
12. Filters (Error Handling)
    ↓
13. HTTP Response
\`\`\`

## Security Architecture

### 1. Authentication Flow

\`\`\`
User → Login → Validate Credentials → Generate JWT → Return Token
                                                          ↓
Protected Route → Extract Token → Verify JWT → Get User → Allow Access
\`\`\`

### 2. Authorization Flow

\`\`\`
Request → JwtAuthGuard → RolesGuard → Check User Role → Allow/Deny
\`\`\`

### 3. Security Layers

1. **Network Level**: CORS, Rate Limiting
2. **Application Level**: Helmet headers
3. **Authentication**: JWT tokens
4. **Authorization**: Role-based access control
5. **Data Level**: Input validation, SQL injection prevention (Prisma)
6. **Password**: Bcrypt hashing

## Database Architecture

### Prisma Schema Design

\`\`\`
User (1) ←→ (1) Profile
  ↓
  │ (1:N)
  ↓
Post
\`\`\`

### Migration Strategy

1. **Development**: \`prisma migrate dev\`
2. **Production**: \`prisma migrate deploy\`
3. **Rollback**: Manual via SQL or new migration

## Error Handling Strategy

### Error Hierarchy

\`\`\`
HttpException
├── BadRequestException (400)
├── UnauthorizedException (401)
├── ForbiddenException (403)
├── NotFoundException (404)
├── ConflictException (409)
└── InternalServerErrorException (500)
\`\`\`

### Error Response Format

\`\`\`json
{
  "statusCode": 404,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/users/123",
  "method": "GET",
  "message": "User with ID 123 not found"
}
\`\`\`

## Testing Strategy

### Test Pyramid

\`\`\`
        /\\
       /E2E\\        (Few - Slow)
      /------\\
     /  INT   \\      (Some - Medium)
    /----------\\
   /   UNIT     \\    (Many - Fast)
  /--------------\\
\`\`\`

### Unit Tests

Test individual services:

\`\`\`typescript
describe('UsersService', () => {
  it('should find user by id', async () => {
    const user = await service.findById('123');
    expect(user).toBeDefined();
  });
});
\`\`\`

### E2E Tests

Test complete flows:

\`\`\`typescript
it('/users/me (GET)', () => {
  return request(app.getHttpServer())
    .get('/api/v1/users/me')
    .set('Authorization', \`Bearer \${token}\`)
    .expect(200);
});
\`\`\`

## Performance Considerations

### 1. Database Optimization

- Indexes trên các trường thường query
- Select chỉ fields cần thiết
- Pagination cho large datasets
- Connection pooling

### 2. Caching Strategy

\`\`\`typescript
// Future: Redis caching
@Cacheable('users', { ttl: 300 })
async findAll() {
  return this.prisma.user.findMany();
}
\`\`\`

### 3. Query Optimization

\`\`\`typescript
// Bad: N+1 query
const users = await prisma.user.findMany();
for (const user of users) {
  user.posts = await prisma.post.findMany({ where: { authorId: user.id } });
}

// Good: Include relation
const users = await prisma.user.findMany({
  include: { posts: true }
});
\`\`\`

## Scalability

### Horizontal Scaling

- Stateless application (JWT tokens)
- Database connection pooling
- Load balancer ready
- Docker containerized

### Vertical Scaling

- Efficient queries
- Proper indexing
- Caching layer
- Background jobs (Bull/BullMQ)

## Monitoring & Logging

### Logging Levels

1. **ERROR**: Errors cần investigate
2. **WARN**: Warnings, deprecated usage
3. **INFO**: Important events
4. **DEBUG**: Detailed information

### Log Format

\`\`\`
2024-01-01T00:00:00.000Z [AuthService] INFO: User logged in: user@example.com
\`\`\`

## Best Practices

### 1. Code Organization

✅ One responsibility per file
✅ Feature-based folder structure
✅ Shared code in common/
✅ Clear naming conventions

### 2. Error Handling

✅ Use specific exceptions
✅ Global exception filter
✅ Meaningful error messages
✅ Log errors properly

### 3. Security

✅ Never expose passwords
✅ Validate all inputs
✅ Use parameterized queries (Prisma)
✅ Implement rate limiting
✅ Use HTTPS in production

### 4. Performance

✅ Use indexes
✅ Implement pagination
✅ Select only needed fields
✅ Use connection pooling

### 5. Testing

✅ Write unit tests for services
✅ Write e2e tests for critical flows
✅ Mock external dependencies
✅ Aim for >80% coverage

## Future Enhancements

- [ ] Redis caching
- [ ] Background jobs (Bull)
- [ ] File upload (Supabase Storage)
- [ ] Email service
- [ ] WebSocket support
- [ ] GraphQL API
- [ ] Microservices architecture
- [ ] Event-driven architecture

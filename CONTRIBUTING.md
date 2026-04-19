# Contributing Guide

Cảm ơn bạn đã quan tâm đến việc đóng góp cho dự án! 🎉

## 📋 Quy trình Contribute

### 1. Fork và Clone

\`\`\`bash
# Fork repository trên GitHub
# Clone fork của bạn
git clone https://github.com/YOUR_USERNAME/nestjs-supabase-app.git
cd nestjs-supabase-app

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/nestjs-supabase-app.git
\`\`\`

### 2. Tạo Branch mới

\`\`\`bash
# Update main branch
git checkout main
git pull upstream main

# Tạo feature branch
git checkout -b feature/your-feature-name
# hoặc
git checkout -b fix/bug-description
\`\`\`

### 3. Development

\`\`\`bash
# Install dependencies
npm install

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Start development
npm run start:dev
\`\`\`

### 4. Code Standards

#### Naming Conventions

- **Files**: kebab-case (e.g., \`user-profile.service.ts\`)
- **Classes**: PascalCase (e.g., \`UserProfileService\`)
- **Variables/Functions**: camelCase (e.g., \`getUserProfile\`)
- **Constants**: UPPER_SNAKE_CASE (e.g., \`MAX_RETRY_COUNT\`)

#### Code Style

\`\`\`typescript
// ✅ Good
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(\`User with ID \${id} not found\`);
    }
    return user;
  }
}

// ❌ Bad
export class UserService {
  constructor(private prisma: PrismaService) {} // Missing readonly

  async findById(id: string) { // Missing return type
    return await this.prisma.user.findUnique({ where: { id } }); // No error handling
  }
}
\`\`\`

### 5. Testing

\`\`\`bash
# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
\`\`\`

**Test Requirements:**
- Unit tests cho mọi service methods
- E2E tests cho critical flows
- Minimum 80% code coverage

### 6. Commit Messages

Sử dụng [Conventional Commits](https://www.conventionalcommits.org/):

\`\`\`
feat: add user profile endpoint
fix: resolve authentication bug
docs: update API documentation
test: add unit tests for auth service
refactor: improve error handling
style: format code with prettier
chore: update dependencies
\`\`\`

**Examples:**

\`\`\`bash
git commit -m "feat: add pagination to users endpoint"
git commit -m "fix: resolve JWT token expiration issue"
git commit -m "docs: add API examples to README"
git commit -m "test: add e2e tests for auth flow"
\`\`\`

### 7. Push và Create PR

\`\`\`bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request trên GitHub
\`\`\`

**PR Template:**

\`\`\`markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
\`\`\`

## 🎯 Development Guidelines

### Adding New Feature

1. **Create Module**
   \`\`\`bash
   nest g resource modules/feature-name
   \`\`\`

2. **Update Prisma Schema**
   \`\`\`prisma
   model FeatureName {
     id        String   @id @default(uuid())
     // fields...
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   \`\`\`

3. **Run Migration**
   \`\`\`bash
   npx prisma migrate dev --name add_feature_name
   \`\`\`

4. **Create DTOs**
   \`\`\`typescript
   export class CreateFeatureDto {
     @IsString()
     @MinLength(3)
     name: string;
   }
   \`\`\`

5. **Implement Service**
   \`\`\`typescript
   @Injectable()
   export class FeatureService {
     constructor(private readonly prisma: PrismaService) {}
     // methods...
   }
   \`\`\`

6. **Add Tests**
   \`\`\`typescript
   describe('FeatureService', () => {
     // test cases...
   });
   \`\`\`

7. **Update Documentation**
   - Add API endpoints to README
   - Update Swagger decorators

### Bug Fixes

1. **Reproduce Bug**
   - Write failing test first
   - Document steps to reproduce

2. **Fix Issue**
   - Make minimal changes
   - Ensure test passes

3. **Verify**
   - Run all tests
   - Manual testing
   - Check for side effects

## 🔍 Code Review Process

### For Contributors

- Respond to feedback promptly
- Make requested changes
- Keep PR focused and small
- Update PR description if scope changes

### For Reviewers

Check for:
- [ ] Code quality and style
- [ ] Test coverage
- [ ] Documentation updates
- [ ] Performance implications
- [ ] Security concerns
- [ ] Breaking changes

## 🐛 Reporting Bugs

**Bug Report Template:**

\`\`\`markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 11]
- Node: [e.g., 20.x]
- npm: [e.g., 10.x]

## Additional Context
Screenshots, logs, etc.
\`\`\`

## 💡 Feature Requests

**Feature Request Template:**

\`\`\`markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Mockups, examples, etc.
\`\`\`

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## ❓ Questions?

- Open an issue for questions
- Join discussions
- Check existing issues first

## 🙏 Thank You!

Every contribution helps make this project better. Thank you for your time and effort! 🎉

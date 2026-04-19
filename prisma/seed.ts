import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: Role.ADMIN,
      isActive: true,
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create regular user
  const userPassword = await bcrypt.hash('User@123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: Role.USER,
      isActive: true,
    },
  });

  console.log('✅ Regular user created:', user.email);

  // Create sample posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with NestJS',
      content: 'NestJS is a progressive Node.js framework for building efficient and scalable server-side applications.',
      published: true,
      authorId: admin.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Introduction to Prisma',
      content: 'Prisma is a next-generation ORM that makes working with databases easy and type-safe.',
      published: true,
      authorId: user.id,
    },
  });

  console.log('✅ Sample posts created');
  console.log('\n📝 Test credentials:');
  console.log('Admin: admin@example.com / Admin@123');
  console.log('User: user@example.com / User@123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

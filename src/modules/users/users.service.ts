import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    const cacheKey = 'users:all';
    
    // Try to get from cache
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    // If not in cache, fetch from database
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Store in cache
    await this.cacheManager.set(cacheKey, users, 300000); // 5 minutes

    return users;
  }

  async findById(id: string) {
    const cacheKey = `user:${id}`;
    
    // Try to get from cache
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Store in cache
    await this.cacheManager.set(cacheKey, user, 300000); // 5 minutes

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findById(id);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Invalidate cache
    await this.cacheManager.del(`user:${id}`);
    await this.cacheManager.del('users:all');

    return updatedUser;
  }

  async remove(id: string) {
    await this.findById(id);

    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    // Invalidate cache
    await this.cacheManager.del(`user:${id}`);
    await this.cacheManager.del('users:all');

    return deletedUser;
  }
}

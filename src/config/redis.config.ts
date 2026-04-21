import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

@Injectable()
export class RedisConfigService implements CacheOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createCacheOptions(): Promise<CacheModuleOptions> {
    const redisUrl = this.configService.get<string>('REDIS_URL');

    if (!redisUrl) {
      // Fallback to in-memory cache if Redis is not configured
      return {
        ttl: this.configService.get<number>('REDIS_TTL', 3600) * 1000,
        max: 100,
      };
    }

    return {
      store: await redisStore({
        url: redisUrl,
        ttl: this.configService.get<number>('REDIS_TTL', 3600) * 1000,
      }),
    };
  }
}

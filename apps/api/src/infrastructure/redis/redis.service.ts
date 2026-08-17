import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import type { RedisClientType } from 'redis';
import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClientType,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.redisClient.connect();
  }

  async onModuleDestroy(): Promise<void> {
    if (this.redisClient.isOpen) {
      await this.redisClient.quit();
    }
  }
}

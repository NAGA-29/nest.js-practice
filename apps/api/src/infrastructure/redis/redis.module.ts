import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { createRedisUrl } from '../config/redis.config';
import { REDIS_CLIENT } from './redis.constants';
import { RedisService } from './redis.service';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => createClient({ url: createRedisUrl() }),
    },
    RedisService,
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}

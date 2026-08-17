import { createRedisUrl } from './redis.config';

describe('createRedisUrl', () => {
  it('reads the Redis connection from environment variables', () => {
    expect(createRedisUrl({ REDIS_HOST: 'redis', REDIS_PORT: '6380' })).toBe(
      'redis://redis:6380',
    );
  });
});

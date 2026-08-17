type Environment = Record<string, string | undefined>;

export function createRedisUrl(environment: Environment = process.env): string {
  const host = environment.REDIS_HOST ?? 'localhost';
  const port = environment.REDIS_PORT ?? '6379';

  return `redis://${host}:${port}`;
}

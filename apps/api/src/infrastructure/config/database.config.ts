import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

type Environment = Record<string, string | undefined>;

export function createDatabaseOptions(
  environment: Environment = process.env,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: environment.POSTGRES_HOST ?? 'localhost',
    port: Number(environment.POSTGRES_PORT ?? 5432),
    username: environment.POSTGRES_USER ?? 'admin',
    password: environment.POSTGRES_PASSWORD ?? 'admin',
    database: environment.POSTGRES_DB ?? 'todos',
    autoLoadEntities: true,
    synchronize: false,
  };
}

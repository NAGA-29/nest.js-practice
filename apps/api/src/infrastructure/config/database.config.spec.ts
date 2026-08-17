import { createDatabaseOptions } from './database.config';

describe('createDatabaseOptions', () => {
  it('reads the PostgreSQL connection from environment variables', () => {
    expect(
      createDatabaseOptions({
        POSTGRES_HOST: 'postgres',
        POSTGRES_PORT: '5544',
        POSTGRES_USER: 'market',
        POSTGRES_PASSWORD: 'secret',
        POSTGRES_DB: 'market_test',
      }),
    ).toMatchObject({
      type: 'postgres',
      host: 'postgres',
      port: 5544,
      username: 'market',
      password: 'secret',
      database: 'market_test',
      autoLoadEntities: true,
    });
  });
});

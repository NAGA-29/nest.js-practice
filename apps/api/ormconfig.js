module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'admin',
  database: process.env.POSTGRES_DB || 'todos',
  autoLoadEntities: true,
  entities: ['dist/entities/*.entity.js'], // マイグレーションを作成する際に使用するエンティティファイルのパス
  migrations: ['dist/migrations/*.js'], // どのマイグレーションファイルを実行するかを指定
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations', // 出力先のディレクトリ
  },
};

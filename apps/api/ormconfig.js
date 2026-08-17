module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'todos',
  autoLoadEntities: true,
  entities: ['dist/entities/*.entity.js'], // マイグレーションを作成する際に使用するエンティティファイルのパス
  migrations: ['dist/migrations/*.js'], // どのマイグレーションファイルを実行するかを指定
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations', // 出力先のディレクトリ
  },
};

import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './presentation/health.controller';
import { createDatabaseOptions } from './infrastructure/config/database.config';
import { RedisModule } from './infrastructure/redis/redis.module';

@Module({
  imports: [
    ItemsModule,
    TypeOrmModule.forRoot(createDatabaseOptions()),
    AuthModule,
    RedisModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}

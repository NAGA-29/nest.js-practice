import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './presentation/health.controller';

@Module({
  imports: [ItemsModule, TypeOrmModule.forRoot(), AuthModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}

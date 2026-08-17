import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requireStatues = this.reflector.get<string[]>(
      'statuses', // `statuses`というkeyの値を取得する (Roleデコレーターで指定したキー)
      ctx.getHandler(), // 現在のルートハンドラーが対象
    );

    if (!requireStatues) {
      return true;
    }

    const { user } = ctx.switchToHttp().getRequest();
    return requireStatues.some((status) => user.status.includes(status));
  }
}

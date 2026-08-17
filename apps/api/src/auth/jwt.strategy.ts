import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 期限切れのトークンを拒否するかどうか
      secretOrKey: 'secretKey123', // 署名に使用する秘密鍵
    });
  }

  async validate(payload: { id: string; username: string }): Promise<User> {
    // NOTE: ファンクション名はvalidateでなければならない
    const { id, username } = payload;
    const user = await this.userRepository.findOne({
      where: { id, username },
    }); // トークンのペイロードからユーザーを取得

    if (user) {
      return user;
    }

    throw new UnauthorizedException();
  }
}

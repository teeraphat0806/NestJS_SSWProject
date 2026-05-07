import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MY_SECRET',
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}

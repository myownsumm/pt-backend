import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../config/services/config.service';
import { JwtStrategyName, JwtValidatePayload } from '../domains/jwt-stategy.domain';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JwtStrategyName) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtValidatePayload) {
    return {id: payload.sub, email: payload.username};
  }
}

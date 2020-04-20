import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/services/config.service';
import { ConfigModule } from '../config/config.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtStrategyName } from './domains/jwt-stategy.domain';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: JwtStrategyName,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {
}

import { Injectable } from '@nestjs/common';
import { AuthMessages } from '../configs/messages.config';
import { LoginResult } from '../domains/login.domain';
import { JwtValidatePayload } from '../domains/jwt-stategy.domain';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {
  }

  async register(email: string, password: string): Promise<LoginResult> {
    const userEntity = await this.usersService.create({ email, password });

    return this.login(userEntity.email, password);
  }

  async login(email: string, password: string): Promise<LoginResult> {
    const user = await this.usersService.getUser({ email });

    if (!user) {
      throw new Error(`User with email ${email} was not found.`);
    }

    if (!await this.usersService.compareHash(password, user.password)) {
      throw new Error(AuthMessages.loginAttemptError);
    }

    const payload: JwtValidatePayload = { username: email, sub: String(user.id) };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

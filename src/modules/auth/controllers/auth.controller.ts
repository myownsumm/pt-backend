import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginResult } from '../domains/login.domain';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  async postRegister(@Body() body: RegisterDto): Promise<LoginResult> {
    const { email, password, password_confirmation } = body;

    if (password !== password_confirmation) {
      throw new BadRequestException(`Check your password entered.`);
    }

    return this.authService.register(email, password);
  }

  @Post('login')
  async postLogin(@Body() body: LoginDto): Promise<LoginResult> {
    const { email, password } = body;

    return this.authService.login(email, password);
  }
}

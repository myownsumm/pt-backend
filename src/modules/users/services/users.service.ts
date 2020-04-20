import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { User } from '../domains/user.domain';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../../config/services/config.service';
import { UsersRepositories } from '../users.providers';

@Injectable()
export class UsersService {
  constructor(@Inject(UsersRepositories.user)
              private readonly usersRepository: Repository<UserEntity>,
              private readonly configService: ConfigService) {
  }

  async create(data: Partial<User>): Promise<UserEntity> {
    return this.usersRepository.save({
      ...data,
      password: await this.getHash(data.password),
    });
  }

  async getUser(data: Partial<User>): Promise<UserEntity | null> {
    return this.usersRepository.findOne(data);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, Number(this.configService.get('BCRYPT_SALT_ROUNDS')));
  }
}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { USERS_REPOSITORIES } from './users.providers';
import { UsersService } from './services/users.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
  ],
  providers: [
    ...USERS_REPOSITORIES,
    UsersService,
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule {
}

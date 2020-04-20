import { Connection, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { DATABASE_CONNECTION } from '../database/database.constants';

export enum UsersRepositories {
  user = 'user',
}

export const USERS_REPOSITORIES = [
  {
    provide: UsersRepositories.user,
    useFactory: (connection: Connection) => connection.getRepository(UserEntity),
    inject: [DATABASE_CONNECTION],
  },
];

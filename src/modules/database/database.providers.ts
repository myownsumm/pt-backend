import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from './database.constants';

export const DATABASE_PROVIDERS = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await createConnection(),
  },
];

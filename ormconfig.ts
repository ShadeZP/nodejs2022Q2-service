import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export default {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  migrationsRun: true,
  synchronize: false,
  autoLoadEntities: true,
  cli: {
    entitiesDir: 'src/**/*.entity{ .ts,.js}',
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
} as DataSourceOptions;

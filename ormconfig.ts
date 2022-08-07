import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export default {
  type: process.env.TYPEORM_CONNECTION,
  host: 'host.docker.internal',
  port: 49155,
  username: 'postgres',
  password: 'postgrespw',
  database: 'postgres',
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
  synchronize: true,
  autoLoadEntities: true,
  cli: {
    entitiesDir: 'src/**/*.entity{.ts,.js}',
    migrationsDir: 'src/migrations/*{.ts,.js}',
  },
} as DataSourceOptions;

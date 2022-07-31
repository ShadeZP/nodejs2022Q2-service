import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export default {
  type: process.env.TYPEORM_CONNECTION,
  host: 'postgresDB',
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
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

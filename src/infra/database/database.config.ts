import { registerAs } from '@nestjs/config';
import { env } from '../config/configuration';

export const databaseConfig = registerAs('database', () => ({
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
}));
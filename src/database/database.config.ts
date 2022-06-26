import * as dotenv from 'dotenv';

import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '12345678',
        database: process.env.DB_NAME_DEVELOPMENT || 'authDb',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        dialect: process.env.DB_DIALECT || 'mysql',
    },
};

import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
interface Config {
  db: {
    dialect: Dialect;
    host: string;
    username: string;
    password: string;
    database: string;
  };
}

const config: Config = {
  db: {
    host: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    username: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    dialect: 'mysql',
    }
};

export default config;


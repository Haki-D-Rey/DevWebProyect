import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PORT: process.env.DB_PORT,
  MAIL_PASS: process.env.MAIL_PASS,
  ECOMMERCE_URL: process.env.ECOMMERCE_URL,
  SALT: process.env.SALT,
};

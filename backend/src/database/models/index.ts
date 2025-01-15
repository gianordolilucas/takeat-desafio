import dotenv from 'dotenv';
import Buyer from './Buyer';
import Product from './Product';
import Restaurant from './Restaurant';
import { Order } from './Order';
import { Sequelize } from 'sequelize-typescript';
import Address from './Address';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME!,
  dialect: "postgres",
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST,
  models: [Address, Buyer, Product, Restaurant, Order],
  logging: false,
});


// export { sequelize };
export { sequelize, Restaurant, Buyer, Product, Order, Address };
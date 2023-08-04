import { Sequelize } from "sequelize-typescript";
import 'dotenv/config';
import { User } from "../models/user.model";
import { Contact } from "../models/contact.model";
import seedUsers from "../seeders/user.seeder";
import seedContacts from "../seeders/contact.seeder";

export const connection = new Sequelize({
  username: process.env.MYSQL_USER ?? 'root',
  password: process.env.MYSQL_PASSWORD ?? '123456',
  database: process.env.MYSQL_DATABASE ?? 'stefano',
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
  models: [
    User,
    Contact
  ]
});

async function connectionDB() {
  try {
    await connection.sync({ force: true });
    await seedUsers();
    await seedContacts();
  } catch (error) {
    console.log(error);
  }
}

export default connectionDB;

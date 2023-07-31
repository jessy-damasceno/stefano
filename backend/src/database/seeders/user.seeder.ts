import { User } from '../models/user.model';

const userData = [
  { username: 'user', email: 'user@example.com', password: 'password' },
  { username: 'jessy', email: 'jessy@teste.com', password: '123456' },
  { username: 'stefano', email: 'stefano@teste.com', password: '123456' },
];

const seedUsers = async () => User.bulkCreate(userData);

export default seedUsers;

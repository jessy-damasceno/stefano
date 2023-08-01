import { User } from '../models/user.model';

const userData = [
  { username: 'user', email: 'user@example.com', password: '$2b$08$UgX3UKX3oKX7NAFPirEZ6OCKzjso1pYSlWLuYifeBNy84/tjSxmMm' },
  { username: 'jessy', email: 'jessy@teste.com', password: '$2b$08$UgX3UKX3oKX7NAFPirEZ6OCKzjso1pYSlWLuYifeBNy84/tjSxmMm' },
  { username: 'stefano', email: 'stefano@teste.com', password: '$2b$08$UgX3UKX3oKX7NAFPirEZ6OCKzjso1pYSlWLuYifeBNy84/tjSxmMm' },
];

const seedUsers = async () => User.bulkCreate(userData);

export default seedUsers;

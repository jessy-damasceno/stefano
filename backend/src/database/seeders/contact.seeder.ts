import { Contact } from '../models/contact.model';

const seedContacts = async () => Contact.bulkCreate([
  { userId: 2, contactName: 'user', email: 'user@example.com' },
  { userId: 2, contactName: 'stefano', email: 'stefano@teste.com' },
  { userId: 1, contactName: 'jessy', email: 'jessy@teste.com' },
]);

export default seedContacts;

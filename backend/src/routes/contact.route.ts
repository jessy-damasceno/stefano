import { Router } from 'express';
import validateToken from '../middlewares/token.middleware';
import { getAll, create, editContact, deleteContact } from '../controllers/contact.controller';
import { validateContactFields } from '../middlewares/validate.middleware';

const contactRouter = Router();

contactRouter.route('/')
  .get(validateToken, getAll)
  .post(validateToken, validateContactFields, create);

contactRouter.route('/:id')
  .put(validateToken, validateContactFields, editContact)
  .delete(validateToken, deleteContact);

export default contactRouter;

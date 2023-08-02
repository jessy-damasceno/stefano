import { Router } from 'express';
import { validateEditUserFields, validateLoginFields, validateUserFields } from '../middlewares/validate.middleware';
import validateToken from '../middlewares/token.middleware';
import { isExistsUser } from '../middlewares/login.middleware';
import { getUser, login, createUser, editUser, getAllUsers } from '../controllers/user.controller';
import { Contact } from '../database/models/contact.model';

const userRouter = Router();

userRouter.route('/')
  .get(validateToken, getUser)
  .put(validateToken, validateEditUserFields, editUser)
  .post(validateUserFields, isExistsUser, createUser);

userRouter.post('/login', validateLoginFields, login);

userRouter.get('/all', getAllUsers); // apenas para testar o banco: excluir a rota.

userRouter.get('/contact/:id', async (req, res, next) => {
  try {
    const contacts = await Contact.findAll({
      where: { userId: req.params.id },
    })
    return res.status(200).json(contacts);
    
  } catch (error) {
    return next(error);
  };
});

export default userRouter;

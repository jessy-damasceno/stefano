import { Request, Response, NextFunction } from 'express';
import validate from '../validations/';
import { contactSchema, editUserSchema, loginSchema, userSchema } from '../validations/schemas';
import { IContact, ILogin, IUser } from '../interfaces';


export const validateLoginFields = async (req: Request, _res: Response, next: NextFunction) => {
  const error = validate<ILogin>(req.body, loginSchema);

  if (error.type) {
    return next(error);
  }
  return next();
};

export const validateUserFields = async (req: Request, _res: Response, next: NextFunction) => {
  const error = validate<IUser>(req.body, userSchema);

  if (error.type) {
    return next(error);
  }
  return next();
};

export const validateEditUserFields = async (req: Request, _res: Response, next: NextFunction) => {
  const error = validate<IUser>(req.body, editUserSchema);

  if (error.type) {
    return next(error);
  }
  return next();
};

export const validateContactFields = async (req: Request, _res: Response, next: NextFunction) => {
  const error = validate<IContact>(req.body, contactSchema);

  if (error.type) {
    return next(error);
  }
  return next();
};
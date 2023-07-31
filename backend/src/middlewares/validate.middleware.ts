import { Request, Response, NextFunction } from 'express';
import validate from '../validations/';
import { loginSchema, userSchema } from '../validations/schemas';
import { ILogin, IUser } from '../interfaces';


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
import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces';
import { User } from '../database/models/user.model';

const isValidUser = async ({ email, password }: ILogin): Promise<boolean> => {
  const user = await User.findOne({ where: { email } });

  if (!user) { return false; }
  if (!bcrypt.compareSync(password, user.password)) { return false; }

  return true;
};

export const isExistsUser = async (req: Request, _res: Response, next: NextFunction) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  return !user ? next() : next({
      type: 'ALREADY_REGISTERED',
      message: 'User already exists',
    });
};

export const login = async (req: Request, _res: Response, next: NextFunction) => {
  const isUser = await isValidUser(req.body);

  return isUser ? next() : next({
    type: 'UNAUTHORIZED_USER',
    message: 'Incorrect email or password',
  });
};
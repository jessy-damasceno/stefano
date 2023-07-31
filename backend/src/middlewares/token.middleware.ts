import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../database/models/user.model';

const secret = process.env.JWT_SECRET || 'my_secret';

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('  ');
  if (!token) {
    next({
      type: 'TOKEN_ERROR',
      message: 'Expired or invalid token',
    });
  }

  try {
    const { email } = jwt.verify(token, secret) as JwtPayload;
    const user: User = await User.findOne({ where: { email } });

    if (!user) {
      next({ type: 'TOKEN_ERROR', message: 'Expired or invalid token' });
    }

    res.locals.user = user;
    next();
  } catch (err) {
    next({ type: 'TOKEN_ERROR', message: 'Expired or invalid token' });
  }
};
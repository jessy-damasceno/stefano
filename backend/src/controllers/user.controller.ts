import { NextFunction, Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import statusCodes from "../utils/statusCodes";
import tokenGenerator from "../utils/generateToken";
import { User } from "../database/models/user.model";

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, bcrypt.genSaltSync(8));

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next({
      type: 'UNAUTHORIZED_USER',
      message: "Invalid e-mail or password",
    });
  };
  
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) return next({
    type: 'UNAUTHORIZED_USER',
    message: "Invalid e-mail or password",
  });
  
  return res.status(statusCodes.ok).json({
    token: tokenGenerator(email as string),
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { user } = res.locals;

  return res.status(statusCodes.ok).json({ user });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  return res.status(statusCodes.ok).json(users);
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const hashedPassword = await hashPassword(req.body.password);
  
  const user = await User.create({ ...req.body, password: hashedPassword });

  if (user) return res.status(200).json({ user });

  return next({
    type: 'SERVER_ERROR',
    message: "Something went wrong",
  })
};

export const editUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  const { user } = res.locals as { user: User };
  let hashedPassword: string | undefined;

  if (password) {
    hashedPassword = await hashPassword(password);
  }

  user.username = username ?? user.username;
  user.email = email ?? user.email;
  user.password = hashedPassword ?? user.password;

  await user.save();

  const newToken = tokenGenerator(user.email);

  return res.status(statusCodes.ok).json({ user, token: newToken });
};

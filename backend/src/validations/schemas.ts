import Joi from "joi";
import IUser from "../interfaces/IUser";

const userSchema = Joi.object<IUser>({
  username: Joi.string().min(3).max(64).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object<IUser>({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
});

export {
  userSchema,
  loginSchema,
}
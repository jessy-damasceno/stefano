import Joi from "joi";
import IUser from "../interfaces/IUser";

const userSchema = Joi.object<IUser>({
  username: Joi.string().min(3).max(64).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
});

const editUserSchema = Joi.object<IUser>({
  username: Joi.string().min(3).max(64),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(6),
});


const loginSchema = Joi.object<IUser>({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
});

export {
  userSchema,
  editUserSchema,
  loginSchema,
}
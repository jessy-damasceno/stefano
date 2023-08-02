import { NextFunction, Request, Response } from "express";
import { Contact } from "../database/models/contact.model";
import { User } from "../database/models/user.model";
import { IError } from "../interfaces";
import statusCodes from "../utils/statusCodes";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals as { user: User };

  try {
    const contacts = await Contact.findAll({
      where: { userId: user.id  },
    })
    return res.status(statusCodes.ok).json(contacts);
    
  } catch (error) {
    return next(error);
  };
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals as { user: User };
  const { contactName, email } = req.body;
  
  try {
    const contact = await Contact.create({
      userId: user.id,
      contactName,
      email,
    });

    return res.status(statusCodes.created).json(contact);
  } catch (error) {
    next(error);
  }
};

export const editContact = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { contactName, email } = req.body;

  const contact = await Contact.findByPk(id);

  if (!contact) {
    return next({
      type: "NOT_FOUND",
      message: "Contact not found",
    } as IError)
  }

  contact.email = email;
  contact.contactName = contactName;

  try {
    await contact.save();
    return res.status(statusCodes.ok).json(contact);
  } catch (error) {
    return next(error);
  };
};

export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    await Contact.destroy({ where: { id } });
    return res.status(statusCodes.ok).json({ message: "Contact deleted successfully"});
  } catch (error) {
    return next(error);
  }
};
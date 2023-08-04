import axios from "axios";
import 'dotenv/config';

export interface IContact {
  id: number;
  userId: number;
  contactName: string;
  email: string;
}

interface INewContact {
  contactName: string;
  email: string;
}

const HOST = process.env.HOST ?? 'http://localhost:3001';

export const getContactsRequest = async (token: string) => {
  const config = {
    headers: { 
      Authorization: token
    }
  };

  const response = await axios.get(
    `${HOST}/contact`,
    config
  ).then((response) => {
    return {
      status: response.status,
      message: null,
      contacts: response.data as IContact[],
    };
  }).catch((error) => {
    return {
      status: error.response.status,
      message: error.response.data.message,
      contacts: [],
    };
  });

  return response;
};

export const addNewContact = async (token: string, payload: INewContact) => {
  const { contactName, email } = payload;

  const config = {
    headers: { 
      Authorization: token
    }
  };

  const response = await axios.post(
    `${HOST}/contact`,
    { contactName, email },
    config,
  ).then((response) => {
    return {
      status: response.status,
      message: null,
      contact: response.data as IContact,
    };
  }).catch((error) => {
    return {
      status: error.response.status,
      message: error.response.data.message,
      contact: null,
    };
  });

  return response;
};

export const editContactRequest = async (token: string, id: string | number, payload: INewContact) => {
  const { contactName, email } = payload;

  const config = {
    headers: { 
      Authorization: token
    }
  };

  const response = await axios.put(
    `${HOST}/contact/${id}`,
    { contactName, email },
    config,
  ).then((response) => {
    return {
      status: response.status,
      message: 'Success',
      contact: response.data as IContact,
    };
  }).catch((error) => {
    return {
      status: error.response.status,
      message: error.response.data.message,
      contact: null,
    };
  });

  return response;
};

export const removeContactRequest = async (token: string, id: string | number) => {
  const config = {
    headers: { 
      Authorization: token
    }
  };

  const response = await axios.delete(
    `${HOST}/contact/${id}`,
    config,
  ).then((response) => {
    return {
      status: response.status,
      message: response.data.message,
    };
  }).catch((error) => {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  });

  return response;
};

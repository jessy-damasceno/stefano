import axios from "axios";
import 'dotenv/config';

interface ILogin {
  email: string;
  password: string;
}

interface IUser {
  username?: string;
  email?: string;
  password?: string;
}

interface IRegister {
  username: string;
  email: string;
  password: string;
}

const HOST = process.env.HOST ?? 'http://localhost:3001';

export const getUserRequest = async (token: string) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.get(
    `${HOST}/user`,
    config
  ).then((response) => {
    return {
      status: response.status,
      message: 'Get user request successful',
      user: response.data.user,
    };
  }).catch((error) => {
    return {
      status: error.response.status,
      message: error.response.data.message,
      user: null,
    };
  });

  return response;
};

export const loginRequest = async (payload: ILogin) => {
  const { email, password } = payload;

  const response = await axios.post(
    `${HOST}/user/login`,
    { email, password }
  ).then((response) => {
    return {
      status: response.status,
      message: 'Login successful',
      token: response.data.token,
    };
  }).catch((error) => {
    return {
      status: error.response.status,
      message: error.response.data.message,
      token: null,
    };
  });

  return response;
}

export const createUserRequest = async (payload: IRegister) => {
  const { username, email, password } = payload;

  const response = await axios.post(
    `${HOST}/user/`,
    { username, email, password }
  ).then((response) => {
    return {
      status: response.status,
      message: 'User created successfully',
      user: response.data.user,
    };
  }).catch((error) => {
    return {
      status: error.response.status,
      message: error.response.data.message,
      user: null,
    };
  });

  return response;
}

export const editUserRequest = async (token: string, payload: IUser) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.put(
    `${HOST}/user/`,
    { ...payload },
    config
  ).then((response) => {
    return {
      status: response.status,
      message: 'User saved successfully',
      user: response.data.user,
      token: response.data.token,
    };
  }).catch((error) => {
    return {
      status: error.response.status,
      message: error.response.data.message,
      user: null,
      token: null,
    };
  });

  return response;
}

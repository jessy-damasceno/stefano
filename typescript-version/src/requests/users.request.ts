import axios from "axios";
import 'dotenv/config';

interface ILogin {
  email: string;
  password: string;
}

const HOST = process.env.HOST ?? 'http://localhost:3001';

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
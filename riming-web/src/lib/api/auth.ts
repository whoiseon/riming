import axios from 'axios';
import { loginFormValues, RegisterFormValues } from '../type';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
// axios.defaults.headers.authorization = `Bearer ${}`

export const getMyAccount = async () => {
  const response = await axios.get('/api/me');
  return response.data;
};

export const getMyAccountServer = async (access_token?: string) => {
  const response = await axios.get('/api/me', {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};

export const register = async (params: RegisterFormValues) => {
  const response = await axios.post('/api/auth/register', params);
  return response.data;
};

export const login = async (params: loginFormValues) => {
  const response = await axios.post('/api/auth/login', params);
  return response.data;
};

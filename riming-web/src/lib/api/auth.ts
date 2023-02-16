import axios from 'axios';
import { loginFormValues, RegisterFormValues } from '../type';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export const getMyAccount = async () => {
  const response = await axios.get('/api/me');
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

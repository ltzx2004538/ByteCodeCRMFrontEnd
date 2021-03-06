import axios from 'axios';
import useAuth from './useAuth';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

useAuth(instance);
export default instance;

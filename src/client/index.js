import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

const client = axios.create({
  baseURL: `http://127.0.0.1:3000/`,
  timeout: 5000,
  adapter,
});

export default client;

import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

const client = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 5000,
  adapter,
});

export default client;

import axios from 'axios';
import config from 'config';
import adapter from 'axios/lib/adapters/http';

const client = axios.create({
  baseURL: `http://127.0.0.1:${config.get('port')}/`,
  timeout: 1000,
  adapter,
});

export default client;

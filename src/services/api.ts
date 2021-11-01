import axios from 'axios';
import { parseCookies } from 'nookies';

const api = axios.create({
  baseURL: 'https://achapet-backend.herokuapp.com',
});

const { 'achapet.authToken': token } = parseCookies();

if (token) {
  api.defaults.headers['x-access-token'] = token;
}

api.interceptors.request.use(config => {
  const { url, method, baseURL, data } = config;

  console.log(`> [request] ${method} ${url}`);

  return config;
});

api.interceptors.response.use(
  response => {
    const { data } = response;
    const { method, url, baseURL } = response.config;

    console.log(`> [response] ${method} ${url}`);

    return response;
  },
  error => {
    const { data } = error;
    const { method, url, baseURL } = error.config;

    console.log(`> [response error] ${method} ${url}`);

    return Promise.reject(error);
  },
);

export default api;

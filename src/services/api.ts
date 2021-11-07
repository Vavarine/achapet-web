import axios from 'axios';
import { parseCookies } from 'nookies';
import { getTokenState } from './../states/token/index';

const api = axios.create({
  baseURL: 'https://achapet-backend.herokuapp.com',
});

export const formDataApi = axios.create({
  baseURL: 'https://achapet-backend.herokuapp.com',
  headers: {
    'Content-Type': `multipart/form-data`,
  },
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

const AuthorizationMiddleware = config => {
  const token = getTokenState();
  return {
    ...config,
    headers: { ...config.headers, 'x-access-token': token },
  };
};

api.interceptors.request.use(AuthorizationMiddleware);
formDataApi.interceptors.request.use(AuthorizationMiddleware);

export default api;

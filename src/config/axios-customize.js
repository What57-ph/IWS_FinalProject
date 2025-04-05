import { Mutex } from "async-mutex";
import axios from "axios";

const mutex = new Mutex();
const NO_RETRY_HEADER = 'x-no-retry';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

const handleRefreshToken = async () => {
  return await mutex.runExclusive(async () => {
    try {
      const res = await instance.post('/api/v1/auth/refresh');
      return res.data?.accessToken || null;
    } catch (error) {
      console.error('Refresh token failed : ', error);
      return null
    }
  })
}

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && !config.headers[NO_RETRY_HEADER]) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.headers[NO_RETRY_HEADER]
    ) {
      originalRequest.headers[NO_RETRY_HEADER] = 'true';
      const newToken = await handleRefreshToken();

      if (newToken) {
        localStorage.setItem('access_token', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } else {
        localStorage.removeItem('access_token');
        window.location.href = '/auth/login';
        return Promise.reject(new Error('Session timeout'));
      }
    }
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(new Error('Lỗi kết nối!'));
  }
);

export default instance;
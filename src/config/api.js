import axios from "axios";

export const callTest = () => {
  return axios.get('https://catfact.ninja/fact')
    .then(response => response.data);
}

/**
 * 
Module Auth
 */

export const callLogin = (username, password) => {
  return axios.post('/api/v1/auth/login', { username, password })
    .then(response => response.data);
}

export const callRegister = (username, password) => {
  return axios.post('/api/v1/auth/register', { username, password })
    .then(response => response.data);
}

export const callLogout = () => {
  return axios.post('/api/v1/auth/logout')
    .then(response => response.data);
}

export const callAccount = () => {
  return axios.get('/api/v1/auth/logout')
    .then(response => response.data);
}

export const callRefresh = () => {
  return axios.get('/api/v1/auth/refresh')
    .then(response => response.data);
}


import instance from "./axios-customize";

export const callTest = () => {
  return instance.get('https://catfact.ninja/fact')
    .then(response => response.data);
}

/**
 * 
Module Auth
 */

export const callLogin = (username, password) => {
  return instance.post('/api/v1/auth/login', { username, password })
    .then(response => response.data);
}

export const callRegister = (username, password) => {
  return instance.post('/api/v1/auth/register', { username, password })
    .then(response => response.data);
}

export const callLogout = () => {
  return instance.post('/api/v1/auth/logout')
    .then(response => response.data);
}

export const callAccount = () => {
  return instance.get('/api/v1/auth/logout')
    .then(response => response.data);
}

export const callRefresh = () => {
  return instance.get('/api/v1/auth/refresh')
    .then(response => response.data);
}


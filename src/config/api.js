
import { toast } from "react-toastify";

import instance from "./axios-customize";
export const getUserList = async () => {
  const URL = `api/v1/users`;
  const response = await instance.get(URL);
  return response.data;
};
export const createNewUser = async (userData) => {
  const URL = `api/v1/users`;
  const res = await instance.post(URL, userData);
  if (res.status === 500) {
    console.log(res);
    toast.error("errorrrr");
  }
  return (await res).data;
};
export const updateUser = async (userData) => {
  const URL = `api/v1/users/update`;
  const res = await instance.put(URL, userData);
  return (await res).data;
};
export const deleteUser = async (id) => {
  const URL = `api/v1/users/delete/${id}`;
  const res = await instance.delete(URL);
  return (await res).data;
};


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
}

export const callRegister = (username, password) => {
  return instance.post('/api/v1/auth/register', { username, password })
}

export const callLogout = () => {
  return instance.post('/api/v1/auth/logout')
}

export const callAccount = () => {
  return instance.get('/api/v1/auth/account')
}

export const callRefresh = () => {
  return instance.get('/api/v1/auth/refresh')
}



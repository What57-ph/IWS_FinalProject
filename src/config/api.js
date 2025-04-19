import { toast } from "react-toastify";

import instance from "./axios-customize";
//Module user
export const getUserList = async () => {
  const URL = `api/v1/users`;
  const response = await instance.get(URL);
  return response.data;
};
export const fetchUserByEmail = async (email) => {
  const URL = `/api/v1/user?email=${email}`;
  const res = await instance.get(URL);
  return (await res).data;
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
  return instance
    .get("https://catfact.ninja/fact")
    .then((response) => response.data);
};

/**
 * 
Module Auth
 */

export const callLogin = (username, password) => {
  return instance.post("/api/v1/auth/login", { username, password });
};

export const callRegister = (username, password) => {
  return instance.post("/api/v1/auth/register", { username, password });
};

export const callLogout = () => {
  return instance.post("/api/v1/auth/logout");
};

export const callAccount = () => {
  return instance.get("/api/v1/auth/account");
};

export const callRefresh = () => {
  return instance.get("/api/v1/auth/refresh");
};

//Module file
export const fetchImage = async (imgName) => {
  const URL = `/storage/${imgName}`;
  const res = await instance.get(URL);
  return (await res).data;
};
export const uploadSingleFile = async (imgInfo, folder) => {
  const URL = `api/v1/files`;
  const bodyForm = new FormData();
  bodyForm.append("file", imgInfo);
  bodyForm.append("folder", folder);
  const res = await instance.post(URL, bodyForm, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return (await res).data;
};
//Module event
export const fetchEventList = () => {
  return instance.get("/api/v1/events");
};
export const fetchEventById = async (id) => {
  const URL = `/api/v1/event/${id}`;
  const res = await instance.get(URL);
  return (await res).data;
};
export const deleteEvent = async (id) => {
  const URL = `/api/v1/event/${id}`;
  const res = await instance.delete(URL);
  return (await res).data;
};
export const createNewEvent = async (eventData) => {
  const URL = `api/v1/event`;
  const res = await instance.post(URL, eventData);
  if (res.status === 500) {
    toast.error("errorrrr");
  }
  return (await res).data;
};
export const updateEvent = async (eventData, id) => {
  const URL = `api/v1/event/${id}`;
  const res = await instance.put(URL, eventData);
  return (await res).data;
};

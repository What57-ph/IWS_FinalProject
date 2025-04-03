import axios from "./axiosCustimize";
export const getUserList = async () => {
  const URL = `api/v1/users`;
  const response = await axios.get(URL);
  return response.data;
};
export const createNewUser = async (userData) => {
  const URL = `api/v1/users`;
  const res = await axios.post(URL, userData);
  return (await res).data;
};
export const updateUser = async (userData) => {
  const URL = `api/v1/users/update`;
  const res = await axios.put(URL, userData);
  return (await res).data;
};
export const deleteUser = async (id) => {
  const URL = `api/v1/users/delete/${id}`;
  const res = await axios.delete(URL);
  return (await res).data;
};

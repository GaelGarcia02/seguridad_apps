import axios from "axios";

const API_URL = "http://127.0.0.1:4000/api/users";

export const getAllUsersRequest = async () => {
  return await axios.get(API_URL);
};

export const getUserByIdRequest = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const createUserRequest = async (userData) => {
  return await axios.post(API_URL, userData);
};

export const updateUserRequest = async (id, userData) => {
  return await axios.put(`${API_URL}/${id}`, userData);
};

export const deleteUserRequest = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

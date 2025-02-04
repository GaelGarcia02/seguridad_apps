import axios from "axios";

const API_URL = "http://127.0.0.1:4000/api";

export const loginRequest = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

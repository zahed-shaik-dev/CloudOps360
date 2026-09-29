import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getServices = async () => {
  const response = await api.get("/services");
  return response.data;
};

export const getHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};

export default api;
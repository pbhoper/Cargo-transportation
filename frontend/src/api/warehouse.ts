import axios from "axios";

const API_URL = import.meta.env.VITE_WAREHOUSE_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptor (e.g., for auth tokens)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') ?? '';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getWarehouses = async () => {
  const response = await apiClient.get(API_URL);

  return response.data.data;
};

export const createWarehouse = async (data: Record<string, unknown>) => {
  const response = await apiClient.post(API_URL, data);

  return response.data;
};
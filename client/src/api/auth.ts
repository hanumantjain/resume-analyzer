import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return axios.post(`${API_URL}/auth/register`, data);
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  return axios.post(`${API_URL}/auth/login`, data);
};

export const getProfile = async (token: string) => {
  return axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadResume = async (file: File) => {
  const formData = new FormData()
  formData.append('resume', file)

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
  return response.data
}

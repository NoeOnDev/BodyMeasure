// src/services/AuthService.ts
import axios from 'axios';
import {API_URL} from '@env';

export const loginDoctor = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/doctors/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Error al iniciar sesión';
    } else {
      throw 'Error al iniciar sesión';
    }
  }
};

import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginDoctor = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/doctors/login`, {
      username,
      password,
    });

    const token = response.data.token;
    await AsyncStorage.setItem('authToken', token);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Error al iniciar sesión';
    } else {
      throw 'Error al iniciar sesión';
    }
  }
};

export const loginPatient = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/patient/login`, {
      username,
      password,
    });

    const token = response.data.token;
    await AsyncStorage.setItem('authToken', token);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Error al iniciar sesión';
    } else {
      throw 'Error al iniciar sesión';
    }
  }
};

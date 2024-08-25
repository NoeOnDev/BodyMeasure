import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleLoginError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    const statusCode = error.response.status;

    switch (statusCode) {
      case 400:
        throw 'Solicitud incorrecta. Verifica tus datos.';
      case 401:
        throw 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      case 403:
        throw 'Acceso denegado. No tienes permiso para realizar esta acción.';
      case 404:
        throw 'Usuario no encontrado. Verifica tu nombre de usuario.';
      case 500:
        throw 'Error del servidor. Por favor, inténtalo más tarde.';
      default:
        throw error.response.data.message || 'Error al iniciar sesión.';
    }
  } else {
    throw 'Error al iniciar sesión.';
  }
};

export const loginDoctor = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/doctors/login`, {
      username,
      password,
    });

    const token = response.data.token;
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userType', 'Doctor');

    return response.data;
  } catch (error) {
    handleLoginError(error);
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
    await AsyncStorage.setItem('userType', 'Patient');

    return response.data;
  } catch (error) {
    handleLoginError(error);
  }
};

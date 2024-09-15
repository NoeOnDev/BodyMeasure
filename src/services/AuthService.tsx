import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log('API_URL:', API_URL);

const handleLoginError = async (response: Response) => {
  const statusCode = response.status;

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
      const errorData = await response.json();
      throw errorData.message || 'Error al iniciar sesión.';
  }
};

export const loginDoctor = async (username: string, password: string) => {
  try {
    console.log('LoginDoctor: Making request to', `${API_URL}/doctors/login`);
    const response = await fetch(`${API_URL}/doctors/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      await handleLoginError(response);
    }

    const data = await response.json();
    const token = data.token;
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userType', 'Doctor');

    return data;
  } catch (error) {
    console.log('Login error:', error);
    throw error;
  }
};

export const loginPatient = async (username: string, password: string) => {
  try {
    console.log('LoginPatient: Making request to', `${API_URL}/patient/login`);
    const response = await fetch(`${API_URL}/patient/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      await handleLoginError(response);
    }

    const data = await response.json();
    const token = data.token;
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userType', 'Patient');

    return data;
  } catch (error) {
    console.log('Login error:', error);
    throw error;
  }
};

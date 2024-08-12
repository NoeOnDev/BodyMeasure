import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerPatient = async (patientData: {
  name: string;
  username: string;
  password: string;
  age: number;
  sex: string;
  weight: number;
  phone: string;
  email: string;
  height: number;
}) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw 'No se encontró el token de autenticación';
    }

    const response = await axios.post(`${API_URL}/patient`, patientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Error al registrar al paciente';
    } else {
      throw 'Error al registrar al paciente';
    }
  }
};

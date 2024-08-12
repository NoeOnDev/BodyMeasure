import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPatients = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw 'No se encontró el token de autenticación';
    }

    const response = await axios.get(`${API_URL}/patients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Error al obtener los pacientes';
    } else {
      throw 'Error al obtener los pacientes';
    }
  }
};

export const deletePatient = async (patientId: number) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw 'No se encontró el token de autenticación';
    }

    const response = await axios.delete(`${API_URL}/patient/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || 'Error al eliminar al paciente';
    } else {
      throw 'Error al eliminar al paciente';
    }
  }
};

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
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await axios.post(`${API_URL}/patient`, patientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || 'Error al registrar al paciente';
      throw new Error(errorMessage);
    } else {
      throw new Error('Error al registrar al paciente');
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

export const getPatientData = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await axios.get(`${API_URL}/patient`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        'Error al obtener los datos del paciente';
      throw new Error(errorMessage);
    } else {
      throw new Error('Error al obtener los datos del paciente');
    }
  }
};

export const getPatientHistory = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await axios.get(`${API_URL}/patient/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        'Error al obtener el historial del paciente';
      throw new Error(errorMessage);
    } else {
      throw new Error('Error al obtener el historial del paciente');
    }
  }
};

export const getPatientHistoryById = async (patientId: number) => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await axios.get(
      `${API_URL}/patient/history/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        'Error al obtener el historial del paciente';
      throw new Error(errorMessage);
    } else {
      throw new Error('Error al obtener el historial del paciente');
    }
  }
};

export const getPatientIotData = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await axios.get(`${API_URL}/patient/iot`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return {
        message: 'Diagnóstico completo con éxito',
        note: 'Puede ver el diagnóstico realizado en su historial de diagnósticos',
      };
    } else {
      throw new Error('Diagnóstico fallido');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || 'Diagnóstico fallido';
      throw new Error(errorMessage);
    } else {
      throw new Error('Diagnóstico fallido');
    }
  }
};

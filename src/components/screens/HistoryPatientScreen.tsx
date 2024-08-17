import React from 'react';
import {View, Text} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {styles} from '../styles/HistoryPatientStyles';
import {formatDate, RootStackParamList} from './PatientDetailScreen';

export type HistoryPatientScreenRouteProp = RouteProp<
  RootStackParamList,
  'History'
>;

export const HistoryPatientScreen = (): React.JSX.Element => {
  const route = useRoute<HistoryPatientScreenRouteProp>();
  const {patientName, doctorName, date, time, age, sex, height} = route.params;

  const formatDateAndTime = (date: string, time: string): string => {
    return `${formatDate(date)} ${time}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.patientInfoContainer}>
        <View style={styles.infoColumnOne}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre</Text>
            <Text style={styles.infoValue}>{patientName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Médico responsable</Text>
            <Text style={styles.infoValue}>{doctorName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fecha y Hora</Text>
            <Text style={styles.infoValue}>
              {formatDateAndTime(date, time)}
            </Text>
          </View>
        </View>
        <View style={styles.infoColumnTwo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Edad</Text>
            <Text style={styles.infoValue}>{age} años</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sexo</Text>
            <Text style={styles.infoValue}>{sex}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Altura</Text>
            <Text style={styles.infoValue}>{height} cm</Text>
          </View>
        </View>
      </View>
      {/* Aquí puedes agregar más contenido relacionado con el historial del paciente */}
    </View>
  );
};

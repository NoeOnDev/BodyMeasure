import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/PatientDetailStyles';
import {getPatientHistoryById} from '../../services/PatientService';

interface Diagnosis {
  history_id: number;
  diagnosisDate: string;
  diagnosisTime: string;
}

interface PatientDetails {
  patient_id: number;
  name: string;
  phone: string;
  email: string;
  age: number;
  sex: string;
  height: number;
}

export type RootStackParamList = {
  PatientDetail: {patientDetails: PatientDetails};
};

const screenWidth = Dimensions.get('window').width;

const formatDate = (dateString: string): string => {
  if (!dateString) return 'Fecha inválida';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Fecha inválida';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const PatientDetailScreen = (): React.JSX.Element => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const route = useRoute<RouteProp<RootStackParamList, 'PatientDetail'>>();
  const {patientDetails} = route.params;

  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState<number | null>(
    null,
  );
  const [pressedDiagnosisId, setPressedDiagnosisId] = useState<number | null>(
    null,
  );
  const [menuPosition, setMenuPosition] = useState<{top: number; left: number}>(
    {top: 0, left: 0},
  );
  const pressAnimValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchPatientHistory = async () => {
      try {
        const data = await getPatientHistoryById(patientDetails.patient_id);
        const formattedData = data.map((diagnosis: any) => ({
          history_id: diagnosis.history_id,
          diagnosisDate: diagnosis.date,
          diagnosisTime: diagnosis.time,
        }));
        setDiagnoses(formattedData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Error al obtener el historial del paciente');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPatientHistory();
  }, [patientDetails.patient_id]);

  const toggleMenu = (id: number, top: number, left: number) => {
    if (selectedDiagnosisId === id) {
      setSelectedDiagnosisId(null);
    } else {
      setSelectedDiagnosisId(id);
      setMenuPosition({top: top - 60, left});
    }
  };

  const handleRowPressIn = (id: number) => {
    setPressedDiagnosisId(id);
    Animated.timing(pressAnimValue, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleRowPressOut = () => {
    setPressedDiagnosisId(null);
    Animated.timing(pressAnimValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleRowPress = (id: number) => {
    if (selectedDiagnosisId !== id) {
      setSelectedDiagnosisId(null);
    }
  };

  const handleDeleteDiagnosis = (historialId: number) => {
    Alert.alert(
      'Eliminar Diagnóstico',
      '¿Estás seguro de que deseas eliminar este diagnóstico?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => {
            setDiagnoses(prevDiagnoses =>
              prevDiagnoses.filter(
                diagnosis => diagnosis.history_id !== historialId,
              ),
            );
            setSelectedDiagnosisId(null);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const PatientInfo = () => {
    return (
      <View style={styles.patientInfoContainer}>
        <View style={styles.infoColumnOne}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre</Text>
            <Text style={styles.infoValue}>{patientDetails.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Teléfono</Text>
            <Text style={styles.infoValue}>{patientDetails.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Correo electrónico</Text>
            <Text style={styles.infoValue}>{patientDetails.email}</Text>
          </View>
        </View>
        <View style={styles.infoColumnTwo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Edad</Text>
            <Text style={styles.infoValue}>{patientDetails.age} años</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sexo</Text>
            <Text style={styles.infoValue}>{patientDetails.sex}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Altura</Text>
            <Text style={styles.infoValue}>{patientDetails.height} cm</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderDiagnosis = ({item}: {item: Diagnosis}) => (
    <Animated.View
      style={[
        styles.row,
        selectedDiagnosisId === item.history_id && styles.selectedRow,
        pressedDiagnosisId === item.history_id && {
          transform: [{scale: pressAnimValue}],
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.rowContentDetail}
        onPressIn={() => handleRowPressIn(item.history_id)}
        onPressOut={handleRowPressOut}
        onPress={() => handleRowPress(item.history_id)}>
        <View style={styles.diagnosisDateCell}>
          <Text style={styles.cellText}>{formatDate(item.diagnosisDate)}</Text>
        </View>
        <View style={styles.diagnosisTimeCell}>
          <Text style={styles.cellText}>
            {item.diagnosisTime || 'Hora inválida'}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconCell}
          onPress={event => {
            const {pageY, pageX} = event.nativeEvent;
            toggleMenu(item.history_id, pageY, pageX);
          }}>
          <Icon name="more-vert" size={24} color="#666" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#0078FF" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.boxShadow}>
          <PatientInfo />
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Historial de Diagnósticos</Text>
          {diagnoses.length === 0 ? (
            <Text style={styles.noDiagnosesText}>
              Ups, parece que aún no tiene diagnósticos en el historial.
            </Text>
          ) : (
            <>
              <View style={styles.tableHeader}>
                <View style={styles.headerDateCell}>
                  <Text style={styles.headerText}>Fecha</Text>
                </View>
                <View style={styles.headerTimeCell}>
                  <Text style={styles.headerText}>Hora del Diagnóstico</Text>
                </View>
              </View>
              <FlatList
                data={diagnoses}
                renderItem={renderDiagnosis}
                keyExtractor={item => item.history_id.toString()}
                contentContainerStyle={{paddingBottom: 50}}
                style={{maxHeight: 385}}
              />
            </>
          )}
          {selectedDiagnosisId !== null && (
            <View
              style={[
                styles.menu,
                {
                  top: menuPosition.top,
                  left: Math.min(menuPosition.left, screenWidth - 150),
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.menuItem}
                onPress={() => handleDeleteDiagnosis(selectedDiagnosisId!)}>
                <Text style={styles.menuItemText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

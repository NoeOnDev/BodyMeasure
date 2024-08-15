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
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/PatientDetailStyles';
import {getPatientData} from '../../services/PatientService';

interface Diagnosis {
  historial_id: number;
  diagnosisDate: string;
  diagnosisTime: string;
}

interface PatientDetails {
  name: string;
  phone: string;
  email: string;
  age: number;
  sex: string;
  height: number;
}

const screenWidth = Dimensions.get('window').width;

export const PatientInfoScreen = (): React.JSX.Element => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
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
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await getPatientData();
        setPatientDetails(data);
        // Si el paciente tiene diagnósticos, puedes asignarlos a `diagnoses`
        // setDiagnoses(data.diagnoses); // si los diagnósticos están en la respuesta
      } catch (error) {
        Alert.alert('Error', (error as Error).message);
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

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
                diagnosis => diagnosis.historial_id !== historialId,
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
    if (!patientDetails) return null;

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
        selectedDiagnosisId === item.historial_id && styles.selectedRow,
        pressedDiagnosisId === item.historial_id && {
          transform: [{scale: pressAnimValue}],
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.rowContent}
        onPressIn={() => handleRowPressIn(item.historial_id)}
        onPressOut={handleRowPressOut}
        onPress={() => handleRowPress(item.historial_id)}>
        <View style={styles.diagnosisDateCell}>
          <Text style={styles.cellText}>{item.diagnosisDate}</Text>
        </View>
        <View style={styles.diagnosisTimeCell}>
          <Text style={styles.cellText}>{item.diagnosisTime}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconCell}
          onPress={event => {
            const {pageY, pageX} = event.nativeEvent;
            toggleMenu(item.historial_id, pageY, pageX);
          }}>
          <Icon name="more-vert" size={24} color="#666" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );

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
                keyExtractor={item => item.historial_id.toString()}
                contentContainerStyle={{paddingBottom: 50}}
                style={{maxHeight: 395}}
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
                onPress={() => {
                  Alert.alert('Ver Diagnóstico', 'Funcionalidad pendiente...');
                }}>
                <Text style={styles.menuItemText}>Ver Diagnóstico</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.menuItem}
                onPress={() => handleDeleteDiagnosis(selectedDiagnosisId)}>
                <Text style={styles.menuItemText}>Eliminar Diagnóstico</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

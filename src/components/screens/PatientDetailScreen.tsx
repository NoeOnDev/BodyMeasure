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
  RefreshControl,
} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/PatientDetailStyles';
import {getPatientHistoryById} from '../../services/PatientService';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Diagnosis {
  history_id: number;
  diagnosisDate: string;
  diagnosisTime: string;
  doctorName: string;
  mlgt: number;
  act: number;
  icw: number;
  ecw: number;
  mine: number;
  mg: number;
  pmg: number;
  imc: number;
  mm: number;
  pro: number;
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
  History: {
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
    age: number;
    sex: string;
    height: number;
    mlgt: number;
    act: number;
    icw: number;
    ecw: number;
    mine: number;
    mg: number;
    pmg: number;
    imc: number;
    mm: number;
    pro: number;
  };
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const formatDate = (dateString: string): string => {
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
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const route = useRoute<RouteProp<RootStackParamList, 'PatientDetail'>>();
  const {patientDetails} = route.params;

  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState<number | null>(
    null,
  );
  const [pressedDiagnosisId, setPressedDiagnosisId] = useState<number | null>(
    null,
  );
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    menuDirection: 'up' | 'down';
  }>({top: 0, left: 0, menuDirection: 'down'});
  const pressAnimValue = useRef(new Animated.Value(1)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchPatientHistory = async () => {
    try {
      const data = await getPatientHistoryById(patientDetails.patient_id);
      const formattedData = data.map((diagnosis: any) => ({
        history_id: diagnosis.history_id,
        diagnosisDate: diagnosis.date,
        diagnosisTime: diagnosis.time,
        doctorName: diagnosis.doctor_name,
        mlgt: diagnosis.mlgt,
        act: diagnosis.act,
        icw: diagnosis.icw,
        ecw: diagnosis.ecw,
        mine: diagnosis.mine,
        mg: diagnosis.mg,
        pmg: diagnosis.pmg,
        imc: diagnosis.imc,
        mm: diagnosis.mm,
        pro: diagnosis.pro,
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
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPatientHistory();
  }, [patientDetails.patient_id]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPatientHistory();
  };

  const toggleMenu = (id: number, top: number, left: number) => {
    const isNearBottom = top > screenHeight * 0.75;

    const menuDirection = isNearBottom ? 'up' : 'down';
    const adjustedTop = isNearBottom ? top - 120 : top - 60;

    if (selectedDiagnosisId === id) {
      setSelectedDiagnosisId(null);
    } else {
      setSelectedDiagnosisId(id);
      setMenuPosition({top: adjustedTop, left, menuDirection});
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
    const selectedHistory = diagnoses.find(
      diagnosis => diagnosis.history_id === id,
    );
    if (selectedHistory) {
      navigation.navigate('History', {
        patientName: patientDetails.name,
        doctorName: selectedHistory.doctorName,
        date: selectedHistory.diagnosisDate,
        time: selectedHistory.diagnosisTime,
        age: patientDetails.age,
        sex: patientDetails.sex,
        height: patientDetails.height,
        mlgt: selectedHistory.mlgt,
        act: selectedHistory.act,
        icw: selectedHistory.icw,
        ecw: selectedHistory.ecw,
        mine: selectedHistory.mine,
        mg: selectedHistory.mg,
        pmg: selectedHistory.pmg,
        imc: selectedHistory.imc,
        mm: selectedHistory.mm,
        pro: selectedHistory.pro,
      });
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
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
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
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#0078FF']}
                    tintColor="#0078FF"
                  />
                }
              />
            </>
          )}
          {selectedDiagnosisId !== null && (
            <View
              style={[
                styles.menu,
                {
                  top: menuPosition.top,
                  left: Math.min(menuPosition.left, screenWidth - 170),
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

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from '../styles/PatientDetailStyles';
import {getPatientData, getPatientHistory} from '../../services/PatientService';

interface Diagnosis {
  history_id: number;
  date: string;
  time: string;
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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const PatientInfoScreen = (): React.JSX.Element => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pressedDiagnosisId, setPressedDiagnosisId] = useState<number | null>(
    null,
  );
  const pressAnimValue = useRef(new Animated.Value(1)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchPatientHistory = async () => {
    try {
      const historyData = await getPatientHistory();
      setDiagnoses(
        historyData.map((item: any) => ({
          history_id: item.history_id,
          date: item.date,
          time: item.time,
          doctorName: item.doctor_name,
          mlgt: item.mlgt,
          act: item.act,
          icw: item.icw,
          ecw: item.ecw,
          mine: item.mine,
          mg: item.mg,
          pmg: item.pmg,
          imc: item.imc,
          mm: item.mm,
          pro: item.pro,
        })),
      );
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const data = await getPatientData();
        setPatientDetails(data);
      } catch (error) {
        Alert.alert('Error', (error as Error).message);
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
    fetchPatientHistory();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPatientHistory();
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchPatientHistory();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

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
    if (selectedHistory && patientDetails) {
      navigation.navigate('History', {
        patientName: patientDetails.name,
        doctorName: selectedHistory.doctorName,
        date: selectedHistory.date,
        time: selectedHistory.time,
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
        pressedDiagnosisId === item.history_id && {
          transform: [{scale: pressAnimValue}],
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.rowContent}
        onPressIn={() => handleRowPressIn(item.history_id)}
        onPressOut={handleRowPressOut}
        onPress={() => handleRowPress(item.history_id)}>
        <View style={styles.diagnosisDateCell}>
          <Text style={styles.cellText}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.diagnosisTimeCell}>
          <Text style={styles.cellText}>{item.time}</Text>
        </View>
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
                keyExtractor={item => item.history_id.toString()}
                contentContainerStyle={{paddingBottom: 20}}
                style={{maxHeight: 350}}
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
        </View>
      </View>
    </SafeAreaView>
  );
};

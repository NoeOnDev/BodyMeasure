import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/PatientsAllStyles';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {getPatients, deletePatient} from '../../services/PatientService';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Patient {
  patient_id: number;
  name: string;
}

type RootStackParamList = {
  PatientDetail: {patientDetails: Patient};
  Register: undefined;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const PatientScreen = (): React.JSX.Element => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null,
  );
  const [pressedPatientId, setPressedPatientId] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    menuDirection: 'up' | 'down';
  }>({top: 0, left: 0, menuDirection: 'down'});
  const scaleValue = useRef(new Animated.Value(1)).current;
  const pressAnimValue = useRef(new Animated.Value(1)).current;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPatients();
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchPatients();
  };

  const toggleMenu = (id: number, top: number, left: number) => {
    const isNearBottom = top > screenHeight * 0.75;

    const menuDirection = isNearBottom ? 'up' : 'down';
    const adjustedTop = isNearBottom ? top - 100 : top - 55;

    if (selectedPatientId === id) {
      setSelectedPatientId(null);
    } else {
      setSelectedPatientId(id);
      setMenuPosition({top: adjustedTop, left, menuDirection});
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleRowPressIn = (id: number) => {
    setPressedPatientId(id);
    Animated.timing(pressAnimValue, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleRowPressOut = () => {
    setPressedPatientId(null);
    Animated.timing(pressAnimValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleRowPress = (id: number) => {
    const patient = patients.find(p => p.patient_id === id);
    if (patient) {
      navigation.navigate('PatientDetail', {patientDetails: patient});
    }
  };

  const handleDeletePatient = async (
    patientId: number,
    patientName: string,
  ) => {
    Alert.alert(
      'Eliminar Paciente',
      `¿Estás seguro de que deseas eliminar al paciente ${patientName}?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: async () => {
            try {
              await deletePatient(patientId);
              fetchPatients();
              setSelectedPatientId(null);
            } catch (error) {
              Alert.alert('Error', String(error));
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderPatient = ({item}: {item: Patient}) => (
    <Animated.View
      style={[
        styles.row,
        selectedPatientId === item.patient_id && styles.selectedRow,
        pressedPatientId === item.patient_id && {
          transform: [{scale: pressAnimValue}],
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.rowContent}
        onPressIn={() => handleRowPressIn(item.patient_id)}
        onPressOut={handleRowPressOut}
        onPress={() => handleRowPress(item.patient_id)}>
        <View style={styles.idCell}>
          <Text style={styles.cellText}>{item.patient_id}</Text>
        </View>
        <View style={styles.nameCell}>
          <Text style={styles.cellText}>{item.name}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconCell}
          onPress={event => {
            const {pageY, pageX} = event.nativeEvent;
            toggleMenu(item.patient_id, pageY, pageX);
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
      <StatusBar barStyle="light-content" backgroundColor="#0066ff" />
      {patients.length === 0 ? (
        <Text style={styles.noPatientsText}>
          Ups, aún no has agregado pacientes.
        </Text>
      ) : (
        <View style={styles.container}>
          <View style={styles.tableHeader}>
            <View style={styles.headerIdCell}>
              <Text style={styles.headerText}>ID</Text>
            </View>
            <View style={styles.headerNameCell}>
              <Text style={styles.headerText}>Nombre del paciente</Text>
            </View>
          </View>
          <FlatList
            data={patients}
            renderItem={renderPatient}
            keyExtractor={item => item.patient_id.toString()}
            contentContainerStyle={{paddingBottom: 80}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#0078FF']}
                tintColor="#0078FF"
              />
            }
          />
          {selectedPatientId !== null && (
            <View
              style={[
                styles.menu,
                {
                  top: menuPosition.top,
                  left: Math.min(menuPosition.left, screenWidth - 150),
                },
              ]}>
              {/*<TouchableOpacity activeOpacity={0.7} style={styles.menuItem}>
                <Text style={styles.menuItemText}>Editar</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.menuItem}
                onPress={() =>
                  handleDeletePatient(
                    selectedPatientId!,
                    patients.find(p => p.patient_id === selectedPatientId)!
                      .name,
                  )
                }>
                <Text style={styles.menuItemText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <Animated.View
        style={[styles.addButtonContainer, {transform: [{scale: scaleValue}]}]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate('Register')}
          style={styles.addButton}>
          <Icon name="person-add" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

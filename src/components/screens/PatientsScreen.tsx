import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/PatientsAllStyles';
import {useNavigation} from '@react-navigation/native';
import {getPatients} from '../../services/getPatientService';

interface Patient {
  patient_id: number;
  name: string;
}

const screenWidth = Dimensions.get('window').width;

export const PatientsScreen = (): React.JSX.Element => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null,
  );
  const [pressedPatientId, setPressedPatientId] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<{top: number; left: number}>(
    {top: 0, left: 0},
  );
  const scaleValue = useRef(new Animated.Value(1)).current;
  const pressAnimValue = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  useEffect(() => {
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
      }
    };

    fetchPatients();
  }, []);

  const toggleMenu = (id: number, top: number, left: number) => {
    if (selectedPatientId === id) {
      setSelectedPatientId(null);
    } else {
      setSelectedPatientId(id);
      setMenuPosition({top: top - 35, left});
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
    if (selectedPatientId !== id) {
      setSelectedPatientId(null);
    }
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
        <ActivityIndicator size="large" color="#0000ff" />
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

  if (patients.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.noPatientsText}>
          Ups, aún no has agregado pacientes.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
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
        />
        {selectedPatientId !== null && (
          <View
            style={[
              styles.menu,
              {
                top: menuPosition.top,
                left: Math.min(menuPosition.left, screenWidth - 120),
              },
            ]}>
            <TouchableOpacity activeOpacity={0.7} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        <Animated.View
          style={[
            styles.addButtonContainer,
            {transform: [{scale: scaleValue}]},
          ]}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.addButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate('Register')}>
            <Icon name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

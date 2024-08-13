import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/PatientsAllStyles';

interface Patient {
  patient_id: number;
  name: string;
}

const screenWidth = Dimensions.get('window').width;

export const PatientInfoScreen = (): React.JSX.Element => {
  const [patients, setPatients] = useState<Patient[]>([
    {patient_id: 1, name: 'John Doe'},
    {patient_id: 2, name: 'Jane Smith'},
    {patient_id: 3, name: 'Alice Johnson'},
  ]);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null,
  );
  const [pressedPatientId, setPressedPatientId] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<{top: number; left: number}>(
    {top: 0, left: 0},
  );
  const pressAnimValue = useRef(new Animated.Value(1)).current;

  const toggleMenu = (id: number, top: number, left: number) => {
    if (selectedPatientId === id) {
      setSelectedPatientId(null);
    } else {
      setSelectedPatientId(id);
      setMenuPosition({top: top - 35, left});
    }
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

  const handleDeletePatient = (patientId: number, patientName: string) => {
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
          onPress: () => {
            setPatients(prevPatients =>
              prevPatients.filter(patient => patient.patient_id !== patientId),
            );
            setSelectedPatientId(null);
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
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.menuItem}
              onPress={() =>
                handleDeletePatient(
                  selectedPatientId!,
                  patients.find(p => p.patient_id === selectedPatientId)!.name,
                )
              }>
              <Text style={styles.menuItemText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

import React, {useState, useRef} from 'react';
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
import {styles} from '../styles/PatientDetailStyles';

interface Diagnosis {
  historial_id: number;
  diagnosisDate: string;
  diagnosisTime: string;
}

const screenWidth = Dimensions.get('window').width;

export const PatientDetailScreen = (): React.JSX.Element => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([
    {historial_id: 1, diagnosisDate: '2024-08-12', diagnosisTime: '10:00 AM'},
    {historial_id: 2, diagnosisDate: '2024-08-11', diagnosisTime: '02:30 PM'},
    {historial_id: 3, diagnosisDate: '2024-08-10', diagnosisTime: '09:15 AM'},
    {historial_id: 4, diagnosisDate: '2024-08-09', diagnosisTime: '11:45 AM'},
    {historial_id: 5, diagnosisDate: '2024-08-08', diagnosisTime: '03:00 PM'},
    {historial_id: 6, diagnosisDate: '2024-08-07', diagnosisTime: '08:30 AM'},
    {historial_id: 7, diagnosisDate: '2024-08-06', diagnosisTime: '01:00 PM'},
    {historial_id: 8, diagnosisDate: '2024-08-05', diagnosisTime: '10:45 AM'},
    {historial_id: 9, diagnosisDate: '2024-08-04', diagnosisTime: '02:00 PM'},
    {historial_id: 10, diagnosisDate: '2024-08-03', diagnosisTime: '09:30 AM'},
  ]);

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
    return (
      <View style={styles.patientInfoContainer}>
        <View style={styles.infoColumnOne}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre</Text>
            <Text style={styles.infoValue}>
              Carlos Alberto Herrera González
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Teléfono</Text>
            <Text style={styles.infoValue}>9612883712</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Correo electrónico</Text>
            <Text style={styles.infoValue}>CarlosA@gmail.com</Text>
          </View>
        </View>
        <View style={styles.infoColumnTwo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Edad</Text>
            <Text style={styles.infoValue}>24 años</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sexo</Text>
            <Text style={styles.infoValue}>Hombre</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Altura</Text>
            <Text style={styles.infoValue}>172 cm</Text>
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

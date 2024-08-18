import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Alert, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {getPatientIotData} from '../../services/PatientService';
import {styles} from '../styles/DiagnosticStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Patients: undefined;
  PatientTabs: undefined;
  PatientInfo: {refresh: boolean};
};

export const DiagnosticScreen = (): React.JSX.Element => {
  const [loading, setLoading] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleDiagnostic = async () => {
    Alert.alert(
      'Confirmación',
      '¿Está seguro de que quiere realizar el diagnóstico?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await getPatientIotData();
              setLoading(false);
              Alert.alert('Diagnóstico completo', response.note);
              // Emitir evento de navegación
              navigation.navigate('PatientInfo', {refresh: true});
            } catch (error) {
              setLoading(false);
              if (error instanceof Error) {
                Alert.alert('Error', error.message);
              } else {
                Alert.alert('Error', 'Ocurrió un error desconocido');
              }
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{scale: scaleValue}]}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonContainer}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleDiagnostic}
          disabled={loading}>
          {loading ? (
            <LottieView
              source={require('../../assets/lottie/loading.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          ) : (
            <Icon name="play-circle" style={styles.playIcon} />
          )}
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.title}>Empezar diagnóstico</Text>
      <Text style={styles.subtitle}>
        Presiona el botón para empezar tu análisis de composición corporal
      </Text>
    </View>
  );
};

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles/RegisterStyles';
import {registerPatient} from '../../services/PatientService';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Patients: undefined;
};

export const RegisterScreen = (): React.JSX.Element => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [physicalData, setPhysicalData] = useState({
    age: '',
    weight: '',
    gender: '',
    height: '',
  });
  const [accountInfo, setAccountInfo] = useState({
    username: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getIconColor = (value: string) => (value ? '#0078FF' : '#999');

  const scaleValue = useRef(new Animated.Value(1)).current;

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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const clearPersonalInfoField = (field: keyof typeof personalInfo) => {
    setPersonalInfo({...personalInfo, [field]: ''});
  };

  const clearAccountInfoField = (field: keyof typeof accountInfo) => {
    setAccountInfo({...accountInfo, [field]: ''});
  };

  const clearFields = () => {
    setPersonalInfo({
      name: '',
      email: '',
      phone: '',
    });
    setPhysicalData({
      age: '',
      weight: '',
      gender: '',
      height: '',
    });
    setAccountInfo({
      username: '',
      password: '',
    });
  };

  const areFieldsFilled = () => {
    return (
      personalInfo.name &&
      personalInfo.email &&
      personalInfo.phone &&
      physicalData.age &&
      physicalData.weight &&
      physicalData.gender &&
      physicalData.height &&
      accountInfo.username &&
      accountInfo.password
    );
  };

  const handleRegisterPatient = async () => {
    if (!areFieldsFilled()) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const patientData = {
        name: personalInfo.name,
        username: accountInfo.username,
        password: accountInfo.password,
        age: parseInt(physicalData.age, 10),
        sex: physicalData.gender,
        weight: parseInt(physicalData.weight, 10),
        phone: personalInfo.phone,
        email: personalInfo.email,
        height: parseInt(physicalData.height, 10),
      };

      const result = await registerPatient(patientData);
      Alert.alert(
        'Registro exitoso',
        `El paciente ${result.name} ha sido registrado correctamente.`,
        [{text: 'OK', onPress: () => navigation.navigate('Patients')}],
      );
      clearFields();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(
          'Error de registro',
          error.message || 'Hubo un problema al registrar el paciente.',
        );
      } else {
        Alert.alert(
          'Error de registro',
          'Hubo un problema al registrar el paciente.',
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información personal</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="user-circle"
              size={20}
              color={getIconColor(personalInfo.name)}
              style={styles.icon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Nombre"
              value={personalInfo.name}
              onChangeText={text =>
                setPersonalInfo({...personalInfo, name: text})
              }
            />
            {personalInfo.name.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => clearPersonalInfoField('name')}>
                <Icon
                  name="times-circle"
                  size={20}
                  color="#bbb"
                  style={styles.clearIcon}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="envelope"
              size={20}
              color={getIconColor(personalInfo.email)}
              style={styles.icon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Correo electrónico"
              value={personalInfo.email}
              onChangeText={text =>
                setPersonalInfo({...personalInfo, email: text})
              }
              keyboardType="email-address"
            />
            {personalInfo.email.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => clearPersonalInfoField('email')}>
                <Icon
                  name="times-circle"
                  size={20}
                  color="#bbb"
                  style={styles.clearIcon}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="phone"
              size={20}
              color={getIconColor(personalInfo.phone)}
              style={styles.icon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Número de teléfono"
              value={personalInfo.phone}
              onChangeText={text =>
                setPersonalInfo({...personalInfo, phone: text})
              }
              keyboardType="phone-pad"
            />
            {personalInfo.phone.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => clearPersonalInfoField('phone')}>
                <Icon
                  name="times-circle"
                  size={20}
                  color="#bbb"
                  style={styles.clearIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos físicos</Text>

          <View style={styles.row}>
            <View style={styles.inputWithUnitContainer}>
              <TextInput
                style={[styles.input, styles.smallInput, styles.inputWithUnit]}
                placeholder="Edad"
                value={physicalData.age}
                onChangeText={text =>
                  setPhysicalData({...physicalData, age: text})
                }
                keyboardType="numeric"
              />
              <Text style={styles.unitText}>años</Text>
            </View>
            <View style={styles.inputWithUnitContainer}>
              <TextInput
                style={[styles.input, styles.smallInput, styles.inputWithUnit]}
                placeholder="Peso"
                value={physicalData.weight}
                onChangeText={text =>
                  setPhysicalData({...physicalData, weight: text})
                }
                keyboardType="numeric"
              />
              <Text style={styles.unitText}>kg</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.input, styles.smallInput]}>
              <Picker
                style={styles.picker}
                selectedValue={physicalData.gender}
                onValueChange={itemValue =>
                  setPhysicalData({...physicalData, gender: itemValue})
                }>
                <Picker.Item label="Sexo" value="" />
                <Picker.Item label="Masculino" value="Masculino" />
                <Picker.Item label="Femenino" value="Femenino" />
              </Picker>
            </View>
            <View style={styles.inputWithUnitContainer}>
              <TextInput
                style={[styles.input, styles.smallInput, styles.inputWithUnit]}
                placeholder="Estatura"
                value={physicalData.height}
                onChangeText={text =>
                  setPhysicalData({...physicalData, height: text})
                }
                keyboardType="numeric"
              />
              <Text style={styles.unitText}>cm</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la cuenta</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="user"
              size={20}
              color={getIconColor(accountInfo.username)}
              style={styles.icon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Nombre de usuario"
              value={accountInfo.username}
              onChangeText={text =>
                setAccountInfo({...accountInfo, username: text})
              }
            />
            {accountInfo.username.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => clearAccountInfoField('username')}>
                <Icon
                  name="times-circle"
                  size={20}
                  color="#bbb"
                  style={styles.clearIcon}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputContainer}>
            <IconIonicons
              name="lock-closed"
              size={20}
              color={getIconColor(accountInfo.password)}
              style={styles.icon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Contraseña"
              secureTextEntry={!passwordVisible}
              value={accountInfo.password}
              onChangeText={text =>
                setAccountInfo({...accountInfo, password: text})
              }
            />
            {accountInfo.password.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={togglePasswordVisibility}>
                <IconIonicons
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color="#bbb"
                  style={styles.clearIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Animated.View
          style={[
            styles.animatedButtonContainer,
            {transform: [{scale: scaleValue}]},
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleRegisterPatient}>
            <Text style={styles.buttonText}>Agregar paciente</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

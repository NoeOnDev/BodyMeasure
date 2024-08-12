import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../styles/RegisterStyles';

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información personal</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="user"
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
              name="user-circle"
              size={20}
              color={getIconColor(accountInfo.username)}
              style={styles.icon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Usuario"
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
            <Icon
              name="lock"
              size={20}
              color={getIconColor(accountInfo.password)}
              style={styles.icon}
            />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Contraseña"
              value={accountInfo.password}
              secureTextEntry={!passwordVisible}
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
            onPressOut={handlePressOut}>
            <Text style={styles.buttonText}>Agregar paciente</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

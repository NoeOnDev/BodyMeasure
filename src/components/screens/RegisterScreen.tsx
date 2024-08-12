import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información personal</Text>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#999" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Nombre"
              value={personalInfo.name}
              onChangeText={text =>
                setPersonalInfo({...personalInfo, name: text})
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#999" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Correo electrónico"
              value={personalInfo.email}
              onChangeText={text =>
                setPersonalInfo({...personalInfo, email: text})
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#999" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Número de teléfono"
              value={personalInfo.phone}
              onChangeText={text =>
                setPersonalInfo({...personalInfo, phone: text})
              }
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos físicos</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.smallInput]}
              placeholder="Edad"
              value={physicalData.age}
              onChangeText={text =>
                setPhysicalData({...physicalData, age: text})
              }
            />
            <TextInput
              style={[styles.input, styles.smallInput]}
              placeholder="Peso"
              value={physicalData.weight}
              onChangeText={text =>
                setPhysicalData({...physicalData, weight: text})
              }
            />
          </View>
          <View style={styles.row}>
            <View style={[styles.input, styles.smallInput]}>
              <Picker
                selectedValue={physicalData.gender}
                onValueChange={itemValue =>
                  setPhysicalData({...physicalData, gender: itemValue})
                }>
                <Picker.Item label="Sexo" value="" />
                <Picker.Item label="Masculino" value="Masculino" />
                <Picker.Item label="Femenino" value="Femenino" />
              </Picker>
            </View>
            <TextInput
              style={[styles.input, styles.smallInput]}
              placeholder="Estatura"
              value={physicalData.height}
              onChangeText={text =>
                setPhysicalData({...physicalData, height: text})
              }
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la cuenta</Text>
          <View style={styles.inputContainer}>
            <Icon
              name="user-circle"
              size={20}
              color="#999"
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
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#999" style={styles.icon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Contraseña"
              secureTextEntry
              value={accountInfo.password}
              onChangeText={text =>
                setAccountInfo({...accountInfo, password: text})
              }
            />
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
          <Text style={styles.buttonText}>Agregar paciente</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

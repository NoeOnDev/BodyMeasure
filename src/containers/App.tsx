import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  StackActions,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginSwitcher} from '../components/screens/LoginPatientAndDoctor';
import {PatientScreen} from '../components/screens/PatientScreen';
import {RegisterScreen} from '../components/screens/RegisterScreen';
import {PatientDetailScreen} from '../components/screens/PatientDetailScreen';
import {PatientInfoScreen} from '../components/screens/PatientInfoScreen';
import {HistoryPatientScreen} from '../components/screens/HistoryPatientScreen';
import {DiagnosticScreen} from '../components/screens/DiagnosticScreen';
import LoadingScreen from '../components/screens/LoadingScreen';
import {StyleSheet, BackHandler, Alert} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const styles = StyleSheet.create({
  menuOptionsWrapper: {
    position: 'absolute',
    top: 38,
    right: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 5,
  },
  menuOptionWrapper: {
    padding: 10,
  },
  menuOptionText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: 'red',
  },
});
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const PatientTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="PatientInfo"
      activeColor="#0078FF"
      inactiveColor="#8e8e93"
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="PatientInfo"
        component={PatientInfoScreen}
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Diagnostic"
        component={DiagnosticScreen}
        options={{
          tabBarLabel: 'Diagnóstico',
          tabBarIcon: ({color}) => (
            <Icon name="stethoscope" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

type RootStackParamList = {
  Login: undefined;
  Patients: undefined;
  Register: undefined;
  PatientDetail: undefined;
  PatientTabs: undefined;
  History: undefined;
};

const App = (): React.JSX.Element => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const userType = await AsyncStorage.getItem('userType');

      if (token && userType) {
        if (userType === 'Doctor') {
          setInitialRoute('Patients');
        } else {
          setInitialRoute('PatientTabs');
        }
      } else {
        setInitialRoute('Login');
      }
    };

    checkAuthToken();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (initialRoute === 'Login') {
        Alert.alert(
          'Salir',
          '¿Estás seguro de que deseas salir de la aplicación?',
          [
            {
              text: 'Cancelar',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'Salir', onPress: () => BackHandler.exitApp()},
          ],
        );
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [initialRoute]);

  const handleLogout = async (
    navigation: NativeStackNavigationProp<RootStackParamList>,
  ) => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userType');
    setInitialRoute('Login');
    navigation.dispatch(
      StackActions.push('Login', {
        screen: 'Login',
      }),
    );
  };

  if (initialRoute === null) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={({navigation}) => ({
          headerStyle: {
            backgroundColor: '#0078FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 19,
          },
          headerRight: () => (
            <Menu>
              <MenuTrigger>
                <Icon name="dots-vertical" size={28} color="#fff" />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsWrapper: styles.menuOptionsWrapper,
                  optionWrapper: styles.menuOptionWrapper,
                  optionText: styles.menuOptionText,
                }}>
                <MenuOption
                  onSelect={() => handleLogout(navigation)}
                  text="Cerrar sesión"
                />
              </MenuOptions>
            </Menu>
          ),
        })}>
        <Stack.Screen
          name="Login"
          component={LoginSwitcher}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Patients"
          component={PatientScreen}
          options={{
            title: 'Mis pacientes',
            headerBackButtonMenuEnabled: false,
            headerBackVisible: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{title: 'Registro de paciente'}}
        />
        <Stack.Screen
          name="PatientDetail"
          component={PatientDetailScreen}
          options={{title: 'Información del paciente'}}
        />
        <Stack.Screen
          name="PatientTabs"
          component={PatientTabs}
          options={{
            title: 'BodyMeasure',
            headerBackButtonMenuEnabled: false,
            headerBackVisible: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryPatientScreen}
          options={{
            title: 'Historial del diagnóstico',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

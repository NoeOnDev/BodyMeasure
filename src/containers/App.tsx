import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginSwitcher} from '../components/screens/LoginPatientAndDoctor';
import {PatientsScreen} from '../components/screens/PatientsScreen';
import {RegisterScreen} from '../components/screens/RegisterScreen';
import {PatientDetailScreen} from '../components/screens/PatientDetailScreen';

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0078FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 20,
          },
        }}>
        <Stack.Screen
          name="Login"
          component={LoginSwitcher}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Patients"
          component={PatientsScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

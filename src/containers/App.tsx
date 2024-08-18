import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginSwitcher} from '../components/screens/LoginPatientAndDoctor';
import {PatientScreen} from '../components/screens/PatientScreen';
import {RegisterScreen} from '../components/screens/RegisterScreen';
import {PatientDetailScreen} from '../components/screens/PatientDetailScreen';
import {PatientInfoScreen} from '../components/screens/PatientInfoScreen';
import {HistoryPatientScreen} from '../components/screens/HistoryPatientScreen';
import {DiagnosticScreen} from '../components/screens/DiagnosticScreen';

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
          name="PatientInfo"
          component={PatientInfoScreen}
          options={{
            title: 'Información del paciente',
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
        <Stack.Screen
          name="Diagnostic"
          component={DiagnosticScreen}
          options={{
            title: 'Diagnóstico',
            headerBackButtonMenuEnabled: false,
            headerBackVisible: false,
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

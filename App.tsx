import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0066ff" />

      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Bienvenido a BodyMeasure</Text>
          <Text style={styles.subtitle}>
            Organiza tu salud, simplifica tu vida
          </Text>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Iniciar sesión</Text>
          <Text style={styles.loginSubtitle}>Como paciente</Text>

          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#999" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Carlos Alberto"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#999" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            ¿Eres médico? Haz clic <Text style={styles.link}>aquí</Text> y
            gestiona tus pacientes
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0078FF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'left',
  },
  loginContainer: {
    flex: 0.9,
    backgroundColor: '#fff',
    padding: 20,
    borderTopStartRadius: 60,
    elevation: 3,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#0078FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  link: {
    color: '#0078FF',
    textDecorationLine: 'underline',
  },
});

export default App;

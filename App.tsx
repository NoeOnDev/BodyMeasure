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
              placeholder="Usuario"
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

          <TouchableOpacity activeOpacity={0.8} style={styles.button}>
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
    marginLeft: 30,
    gap: 10,
  },
  title: {
    fontSize: 42,
    color: '#ffffff',
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
  },
  loginContainer: {
    flex: 0.9,
    backgroundColor: '#fff',
    padding: 20,
    borderTopStartRadius: 82,
    elevation: 3,
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 42,
    color: '#0078FF',
    marginTop: 20,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 42,
    color: '#0078FF',
    marginBottom: 25,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
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
    width: '100%',
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
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
  },
  footerText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  link: {
    color: '#0078FF',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Regular',
  },
});

export default App;

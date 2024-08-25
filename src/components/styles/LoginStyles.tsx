import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
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
  whiteBackgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 10,
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
    marginBottom: 70,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
  clearIcon: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  animatedButtonContainer: {
    width: '100%',
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
    fontFamily: 'Montserrat-Regular',
  },
});

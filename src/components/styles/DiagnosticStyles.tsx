import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  playIcon: {
    fontSize: 150,
    color: '#007AFF',
    elevation: 5,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#707070',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#B0B0B0',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

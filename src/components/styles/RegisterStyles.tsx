import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  section: {},
  sectionTitle: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 18,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  picker: {
    fontSize: 16,
    marginLeft: -12,
    fontFamily: 'Montserrat-Regular',
  },
  inputWithIcon: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    width: '100%',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    width: '48%',
    fontFamily: 'Montserrat-Regular',
  },
  button: {
    backgroundColor: '#0078FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 14,
  },
});

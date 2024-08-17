import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    elevation: 4,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 14,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 18,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  patientInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 6,
  },
  infoColumnOne: {
    flex: 6,
  },
  infoColumnTwo: {
    flex: 2,
  },
  infoRow: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    fontFamily: 'Montserrat-Regular',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  noDiagnosesText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3d00',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});

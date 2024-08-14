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
    padding: 24,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 18,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerDateCell: {
    flex: 4,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 8,
  },
  headerTimeCell: {
    flex: 6,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopRightRadius: 8,
  },
  diagnosisDateCell: {
    flex: 4,
    padding: 16,
  },
  diagnosisTimeCell: {
    flex: 4.3,
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 2},
    position: 'relative',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedRow: {
    backgroundColor: '#e0e0e0',
  },
  iconCell: {
    padding: 16,
  },
  cellText: {
    fontSize: 17,
    fontFamily: 'Montserrat-Regular',
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    zIndex: 1,
  },
  menuItem: {
    padding: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 14,
  },
  patientInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 6,
  },
  infoColumnOne: {
    flex: 7,
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
});

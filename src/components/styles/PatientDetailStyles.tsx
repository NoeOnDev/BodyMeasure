import { StyleSheet } from 'react-native';

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
    borderRadius: 8,
    padding: 16,
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
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingEnd: 10,
    paddingStart: 10,
  },
  headerDateCell: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 8,
  },
  headerTimeCell: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopRightRadius: 8,
  },
  diagnosisDateCell: {
    padding: 16,
  },
  diagnosisTimeCell: {
    padding: 16,
  },
  headerText: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3d00',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
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
    shadowOffset: { width: 0, height: 2 },
    position: 'relative',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '86%',
  },
  rowContentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectedRow: {
    backgroundColor: '#e0e0e0',
  },
  iconCell: {
    marginLeft: -20,
    padding: 8,
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
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1,
  },
  menuItem: {
    padding: 12,
  },
  menuItemText: {
    fontSize: 15,
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
});

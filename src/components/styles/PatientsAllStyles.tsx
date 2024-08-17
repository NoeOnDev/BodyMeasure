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
  addButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#0078FF',
    borderRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerIdCell: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 8,
  },
  headerNameCell: {
    flex: 6,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopRightRadius: 8,
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
  idCell: {
    flex: 1,
    padding: 16,
  },
  nameCell: {
    flex: 7,
    padding: 16,
  },
  iconCell: {
    padding: 16,
  },
  cellText: {
    fontSize: 16,
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
    padding: 16,
  },
  menuItemText: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
  },
  noPatientsText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
  },
});

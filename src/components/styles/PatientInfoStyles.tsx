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
  headerDateCell: {
    flex: 4,
    padding: 10,
    backgroundColor: '#f0f0f0',
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
    flex: 2,
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
  idCell: {
    flex: 1,
    padding: 16,
  },
  nameCell: {
    flex: 6,
    padding: 16,
  },
  iconCell: {
    padding: 16,
  },
  cellText: {
    fontSize: 18,
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
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat-Regular',
  },
});

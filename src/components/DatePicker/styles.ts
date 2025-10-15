import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { marginVertical: 8 },
  label: { fontWeight: 'bold', marginBottom: 4 },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    justifyContent: 'center',
  },
  dateText: { fontSize: 16 },
  errorText: { color: 'red', marginTop: 4 },
  inputError: { borderColor: 'red' },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    width: '100%',
  },
});

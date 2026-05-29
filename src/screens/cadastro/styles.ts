// Arquivo: src/screens/CadastroScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F1E5',
    padding: 30,
    justifyContent: 'center',
  },
  headerBox: {
    backgroundColor: '#C56A47',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    color: '#A55C45',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#A55C45',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#A55C45',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#C56A47',
    borderRadius: 2,
  },
  checkboxText: {
    color: '#A55C45',
    fontSize: 14,
  },
  buttonPrimary: {
    backgroundColor: '#C56A47',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextPrimary: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
// Arquivo: src/screens/LoginScreen.styles.ts
import { StyleSheet } from 'react-native';

// O "export" aqui é fundamental! Ele permite que outros arquivos "enxerguem" esses estilos.
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F1E5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#A55C45' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#A55C45', 
    marginBottom: 40 
  },
  input: {
    width: '100%', 
    height: 50, 
    borderWidth: 1, 
    borderColor: '#A55C45',
    borderRadius: 8, 
    paddingHorizontal: 15, 
    marginBottom: 15, 
    backgroundColor: '#FFF',
    color: '#333', // <-- Garante que o texto digitado e a senha fiquem escuros e visíveis
    fontSize: 16,  // Melhora a legibilidade do que está sendo digitado
  },
  buttonPrimary: {
    backgroundColor: '#C56A47', 
    width: '100%', 
    height: 50, 
    borderRadius: 8,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 15, 
    marginTop: 10,
  },
  buttonTextPrimary: { 
    color: '#FFF', 
    fontWeight: 'bold' 
  },
  buttonSecondary: {
    backgroundColor: 'transparent', 
    width: '100%', 
    height: 50, 
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#C56A47', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonTextSecondary: { 
    color: '#C56A47', 
    fontWeight: 'bold' 
  }
});
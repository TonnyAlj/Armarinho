// Arquivo: src/screens/LoginScreen.tsx
import { styles } from './styles'; // Importando os estilos que criamos
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ponto a Ponto</Text>
      <Text style={styles.subtitle}>Armarinho Digital</Text>

      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        secureTextEntry={true} 
      />

      <TouchableOpacity style={styles.buttonPrimary}>
        <Text style={styles.buttonTextPrimary}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary}>
        <Text style={styles.buttonTextSecondary}>CADASTRAR-SE</Text>
      </TouchableOpacity>
    </View>
  );
}
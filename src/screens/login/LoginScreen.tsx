// Arquivo: src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles'; // Mantendo a importação exata da sua pasta

export default function LoginScreen({ navigation }: any) {
  // 1. Criamos os estados para guardar o e-mail/usuário e a senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // 2. Função de validação do Login Falso
  const handleLogin = () => {
    // Retira os espaços em branco e deixa tudo minúsculo para evitar erros de digitação
    const usuarioDigitado = email.trim().toLowerCase();

    if (usuarioDigitado === 'admin' && senha === '123456') {
      // Se acertou as credenciais:
      // Usamos "replace" em vez de "navigate" para que o usuário não consiga 
      // voltar para a tela de login apertando o botão de voltar do celular.
      navigation.replace('Home'); 
    } else {
      // Se errou:
      Alert.alert('Erro', 'Usuário ou senha incorretos!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ponto a Ponto</Text>
      <Text style={styles.subtitle}>Armarinho Digital</Text>

      <TextInput 
        style={styles.input} 
        placeholder="E-mail ou Usuário" 
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}           // Ligando o campo à variável
        onChangeText={setEmail} // Atualizando a variável quando digita
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        secureTextEntry={true} 
        value={senha}           // Ligando o campo à variável
        onChangeText={setSenha} // Atualizando a variável quando digita
      />

      {/* 3. Colocamos o evento onPress no botão para disparar a função de login */}
      <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
        <Text style={styles.buttonTextPrimary}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonTextSecondary}>CADASTRAR-SE</Text>
      </TouchableOpacity>
    </View>
  );
}
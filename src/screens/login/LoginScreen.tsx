// Arquivo: src/screens/login/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';

// 1. IMPORTAÇÕES DO FIREBASE
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // Estado para controlar a animação de carregamento
  const [loading, setLoading] = useState(false);

  // 2. FUNÇÃO ASSÍNCRONA DE LOGIN
  const handleLogin = async () => {
    // Retira espaços em branco para evitar erros bobos de digitação
    const emailTratado = email.trim();
    const senhaTratada = senha.trim();

    // Validação básica de campos vazios
    if (emailTratado === '' || senhaTratada === '') {
      Alert.alert('Atenção', 'Por favor, preencha o e-mail e a senha.');
      return;
    }

    setLoading(true); // Liga o carregamento

    try {
      // 3. COMUNICAÇÃO COM A NUVEM
      // O Firebase vai conferir se as credenciais batem
      const userCredential = await signInWithEmailAndPassword(auth, emailTratado, senhaTratada);
      const user = userCredential.user;

      console.log("Usuário logado com sucesso. ID:", user.uid);

      // Se deu tudo certo, apagamos o histórico de navegação e mandamos para a Home
      navigation.replace('Home'); 
      
    } catch (error: any) {
      console.log("Erro no login:", error.message);
      
      // 4. TRADUÇÃO DOS ERROS DO FIREBASE
      let mensagemErro = "Ocorreu um erro ao tentar acessar a conta.";
      
      // Nas versões mais novas, o Firebase unificou os erros de credencial inválida por segurança
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        mensagemErro = "E-mail ou senha incorretos.";
      } else if (error.code === 'auth/invalid-email') {
        mensagemErro = "O formato do e-mail é inválido.";
      }
      
      Alert.alert('Erro no Acesso', mensagemErro);
    } finally {
      setLoading(false); // Desliga o carregamento, dando erro ou não
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ponto a Ponto</Text>
      <Text style={styles.subtitle}>Armarinho Digital</Text>

      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}           
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        secureTextEntry={true} 
        value={senha}           
        onChangeText={setSenha} 
      />

      {/* Botão de Entrar com estado de Carregamento */}
      <TouchableOpacity 
        style={[styles.buttonPrimary, loading && { backgroundColor: '#A55C45' }]} 
        onPress={handleLogin}
        disabled={loading} // Desativa o botão para não enviar duas requisições
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonTextPrimary}>ENTRAR</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('Cadastro')}
        disabled={loading}
      >
        <Text style={styles.buttonTextSecondary}>CADASTRAR-SE</Text>
      </TouchableOpacity>
    </View>
  );
}
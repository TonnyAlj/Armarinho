// Arquivo: src/screens/cadastro/CadastroScreen.tsx
import React, { useState } from 'react';
// 1. IMPORTANTE: Adicionamos o 'Platform' na importação do react-native
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';
import { styles } from './styles';

export default function CadastroScreen({ navigation }: any) {
  // DADOS DE AUTENTICAÇÃO
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // DADOS DE CONTATO E ENDEREÇO
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha || !telefone || !cep || !rua || !numero || !cidade || !estado) {
      if (Platform.OS === 'web') {
        alert("Por favor, preencha todos os campos obrigatórios (*).");
      } else {
        Alert.alert("Atenção", "Por favor, preencha todos os campos obrigatórios (*).");
      }
      return;
    }

    if (senha !== confirmarSenha) {
      if (Platform.OS === 'web') alert("As senhas informadas não coincidem.");
      else Alert.alert("Erro", "As senhas informadas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      if (Platform.OS === 'web') alert("A senha deve conter pelo menos 6 caracteres.");
      else Alert.alert("Erro", "A senha deve conter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      // 1. Cria o usuário no Firebase Auth
      const resultadoAuth = await createUserWithEmailAndPassword(auth, email.trim(), senha);
      const usuarioLogado = resultadoAuth.user;

      // 2. Salva o perfil estendido com o endereço completo no Firestore
      await setDoc(doc(db, 'usuarios', usuarioLogado.uid), {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        telefone: telefone.trim(),
        isAdmin: false, 
        endereco: {
          rua: rua.trim(),
          numero: numero.trim(),
          complemento: complemento.trim(),
          cidade: cidade.trim(), // <-- LINHA CORRIGIDA AQUI!
          estado: estado.trim().toUpperCase(),
          cep: cep.trim()
        },
        dataCriacao: new Date().toISOString()
      });

      if (Platform.OS === 'web') {
        alert("Sucesso! Sua conta foi criada com todos os dados salvos!");
        navigation.navigate('Login');
      } else {
        Alert.alert("Sucesso!", "Sua conta foi criada com todos os dados salvos!", [
          { text: "Entrar", onPress: () => navigation.navigate('Login') }
        ]);
      }

    } catch (error: any) {
      console.error(error);
      let mensagemErro = "Não foi possível realizar o cadastro.";
      if (error.code === 'auth/email-already-in-use') {
        mensagemErro = "Este e-mail já está sendo utilizado em outra conta.";
      } else if (error.code === 'auth/invalid-email') {
        mensagemErro = "O formato do e-mail digitado é inválido.";
      }

      if (Platform.OS === 'web') {
        alert(mensagemErro);
      } else {
        Alert.alert("Erro no Cadastro", mensagemErro);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Insira seus dados para começar a usar o app</Text>

      <Text style={styles.sectionHeader}>Dados de Acesso</Text>
      
      <Text style={styles.label}>Nome Completo *</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Seu nome completo" />

      <Text style={styles.label}>E-mail *</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="exemplo@email.com" />

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Senha *</Text>
          <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry placeholder="Mínimo 6 dígitos" />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Confirmar Senha *</Text>
          <TextInput style={styles.input} value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry placeholder="Repita a senha" />
        </View>
      </View>

      <Text style={styles.sectionHeader}>Contato e Endereço de Entrega</Text>

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Telefone *</Text>
          <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" placeholder="(00) 00000-0000" />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>CEP *</Text>
          <TextInput style={styles.input} value={cep} onChangeText={setCep} keyboardType="numeric" placeholder="00000-000" />
        </View>
      </View>

      <Text style={styles.label}>Rua / Avenida *</Text>
      <TextInput style={styles.input} value={rua} onChangeText={setRua} placeholder="Ex: Rua das Rosas" />

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Número *</Text>
          <TextInput style={styles.input} value={numero} onChangeText={setNumero} placeholder="Ex: 450" />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Complemento</Text>
          <TextInput style={styles.input} value={complemento} onChangeText={setComplemento} placeholder="Apto, Bloco, Casa (Opcional)" />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Cidade *</Text>
          <TextInput style={styles.input} value={cidade} onChangeText={setCidade} placeholder="Sua cidade" />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Estado (UF) *</Text>
          <TextInput style={styles.input} value={estado} onChangeText={setEstado} placeholder="Ex: PR" maxLength={2} autoCapitalize="characters" />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>CADASTRAR E ENTRAR</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')} disabled={loading}>
        <Text style={styles.loginLinkText}>Já tem uma conta? Faça Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
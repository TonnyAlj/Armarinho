// Arquivo: src/screens/cadastro/CadastroScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';

// 1. IMPORTAÇÕES DO FIREBASE (Auth e Firestore)
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { auth, db } from '../../services/firebaseConfig'; 

export default function CadastroScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [termosAceitos, setTermosAceitos] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!termosAceitos) {
      Alert.alert("Atenção", "Você precisa aceitar os termos para continuar.");
      return;
    }

    if (email.trim() === '' || senha.trim() === '' || nome.trim() === '') {
       Alert.alert("Atenção", "Preencha pelo menos Nome, E-mail e Senha.");
       return;
    }

    setLoading(true); 

    try {
      // Passo 1: Cria a credencial de acesso (Login e Senha)
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), senha.trim());
      const user = userCredential.user;

      // Passo 2: Salva os dados extras no Banco de Dados (Firestore)
      // Usamos o UID (ID único) do usuário como o nome do documento para facilitar a busca depois!
      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        endereco: {
          cep: cep.trim(),
          numero: numero.trim()
        },
        // O PULO DO GATO: Todo mundo nasce como cliente normal
        isAdmin: false, 
        dataCadastro: new Date().toISOString()
      });

      console.log("Usuário completo criado com sucesso no Firestore!");
      
      Alert.alert("Sucesso!", "Conta criada com sucesso!", [
        { text: "OK", onPress: () => navigation.replace('Home') }
      ]);

    } catch (error: any) {
      console.log("Erro no cadastro:", error.message);
      
      let mensagemErro = "Ocorreu um erro ao criar a conta.";
      if (error.code === 'auth/email-already-in-use') {
        mensagemErro = "Este e-mail já está cadastrado.";
      } else if (error.code === 'auth/weak-password') {
        mensagemErro = "A senha deve ter pelo menos 6 caracteres.";
      }
      
      Alert.alert("Erro", mensagemErro);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Crie sua Conta</Text>
      </View>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>E-mail</Text>
      <TextInput style={styles.input} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Senha (Mín. 6 dígitos)</Text>
      <TextInput style={styles.input} secureTextEntry={true} value={senha} onChangeText={setSenha} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput style={styles.input} keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} />

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>CEP</Text>
          <TextInput style={[styles.input, { marginBottom: 0 }]} keyboardType="numeric" value={cep} onChangeText={setCep} />
        </View>
        <View style={styles.halfInput}>
            <Text style={styles.label}>Número</Text>
            <TextInput style={[styles.input, { marginBottom: 0 }]} keyboardType="numeric" value={numero} onChangeText={setNumero} />
        </View>
      </View>

      <View style={{ height: 20 }} />

      <TouchableOpacity style={styles.checkboxContainer} onPress={() => setTermosAceitos(!termosAceitos)}>
        <View style={styles.checkbox}>
          {termosAceitos && <View style={styles.checkboxInner} />}
        </View>
        <Text style={styles.checkboxText}>Li e aceito os termos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonPrimary, loading && { backgroundColor: '#A55C45' }]} onPress={handleCadastro} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonTextPrimary}>CRIAR MINHA CONTA</Text>}
      </TouchableOpacity>

    </ScrollView>
  );
}
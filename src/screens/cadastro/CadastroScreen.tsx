// Arquivo: src/screens/CadastroScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [termosAceitos, setTermosAceitos] = useState(false);

  const handleCadastro = () => {
    if (!termosAceitos) {
      alert("Você precisa aceitar os termos para continuar.");
      return;
    }
    console.log("Dados salvos:", { nome, email, cpf, telefone, cep });
    alert("Conta criada com sucesso!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Crie sua Conta</Text>
      </View>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
      />

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>CEP</Text>
          <TextInput
            style={[styles.input, { marginBottom: 0 }]}
            keyboardType="numeric"
            value={cep}
            onChangeText={setCep}
          />
        </View>
        <View style={styles.halfInput}>
            <Text style={styles.label}> </Text>
            <TextInput style={[styles.input, { marginBottom: 0 }]} />
        </View>
      </View>

      <View style={{ height: 20 }} />

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setTermosAceitos(!termosAceitos)}
      >
        <View style={styles.checkbox}>
          {termosAceitos && <View style={styles.checkboxInner} />}
        </View>
        <Text style={styles.checkboxText}>Li e aceito os termos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleCadastro}>
        <Text style={styles.buttonTextPrimary}>CRIAR MINHA CONTA</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
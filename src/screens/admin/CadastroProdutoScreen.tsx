// Arquivo: src/screens/admin/CadastroProdutoScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { styles } from './styles'; // Importando o estilo do arquivo separado!

export default function CadastroProdutoScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('Linhas'); // Valor padrão
  const [estoque, setEstoque] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSalvarProduto = async () => {
    // Validação simples
    if (!nome || !preco || !estoque) {
      Alert.alert("Erro", "Preencha os campos obrigatórios (Nome, Preço e Estoque)");
      return;
    }

    setLoading(true);

    try {
      // 1. Enviando para a coleção 'produtos' no Firestore
      await addDoc(collection(db, 'produtos'), {
        nome: nome.trim(),
        // Convertemos o texto para número para podermos fazer contas depois
        preco: parseFloat(preco.replace(',', '.')), 
        categoria: categoria,
        estoque: parseInt(estoque),
        descricao: descricao.trim(),
        dataCriacao: new Date().toISOString(),
        // Provisoriamente usamos um ícone padrão, depois podemos evoluir para fotos
        icone: categoria === 'Agulhas' ? 'needle' : 'basket-outline'
      });

      Alert.alert("Sucesso!", "Produto cadastrado na vitrine!");
      navigation.goBack(); // Volta para a tela anterior após salvar

    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      Alert.alert("Erro", "Não foi possível salvar o produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#A55C45" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Produto</Text>
      </View>

      <Text style={styles.label}>Nome do Item *</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Lã Mollet 40g" />

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Preço (R$) *</Text>
          <TextInput 
            style={styles.input} 
            value={preco} 
            onChangeText={setPreco} 
            keyboardType="numeric" 
            placeholder="0.00"
          />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Estoque Inicial *</Text>
          <TextInput 
            style={styles.input} 
            value={estoque} 
            onChangeText={setEstoque} 
            keyboardType="numeric" 
            placeholder="Ex: 50"
          />
        </View>
      </View>

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categoryPicker}>
        {['Linhas', 'Agulhas', 'Barbantes', 'Kits'].map((cat) => (
          <TouchableOpacity 
            key={cat} 
            style={[styles.catOption, categoria === cat && styles.catOptionActive]}
            onPress={() => setCategoria(cat)}
          >
            <Text style={[styles.catText, categoria === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Descrição Detalhada</Text>
      <TextInput 
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
        value={descricao} 
        onChangeText={setDescricao} 
        multiline 
        placeholder="Conte mais sobre o material, cor, espessura..."
      />

      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={handleSalvarProduto}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.saveButtonText}>CADASTRAR PRODUTO</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}
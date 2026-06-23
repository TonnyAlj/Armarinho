import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { styles } from './stylesCadastro';

export default function CadastroProdutoScreen({ route, navigation }: any) {
  const produtoExistente = route.params?.produto;

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('Linhas');
  const [estoque, setEstoque] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  const [imagemBase64, setImagemBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (produtoExistente) {
      setNome(produtoExistente.nome);
      setPreco(produtoExistente.preco.toString());
      setEstoque(produtoExistente.estoque.toString());
      setCategoria(produtoExistente.categoria);
      setDescricao(produtoExistente.descricao);
      setImagemUri(produtoExistente.imagemUrl);
    }
  }, [produtoExistente]);

  const selecionarImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissao.status !== 'granted') {
      Alert.alert("Aviso", "Precisamos de acesso à galeria.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // CORREÇÃO APLICADA AQUI
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!resultado.canceled) {
      setImagemUri(resultado.assets[0].uri);
      setImagemBase64(resultado.assets[0].base64 || null);
    }
  };

  const handleSalvarProduto = async () => {
    if (!nome || !preco || !estoque) {
      Alert.alert("Atenção", "Preencha os campos obrigatórios.");
      return;
    }
    
    if (!produtoExistente && !imagemBase64) {
      Alert.alert("Atenção", "Selecione uma foto para o produto.");
      return;
    }

    setLoading(true);

    try {
      let urlFinal = produtoExistente ? produtoExistente.imagemUrl : '';

      if (imagemBase64) {
        const IMGBB_API_KEY = process.env.EXPO_PUBLIC_IMGBB_API_KEY; 
        const formData = new FormData();
        formData.append('image', imagemBase64);

        const respostaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: 'POST',
          body: formData,
        });
        const dadosImgbb = await respostaImgbb.json();
        
        if (!dadosImgbb.success) {
          throw new Error("Falha no upload da imagem para o ImgBB.");
        }
        urlFinal = dadosImgbb.data.url;
      }

      const dadosDoProduto = {
        nome: nome.trim(),
        preco: parseFloat(preco.replace(',', '.')), 
        categoria: categoria,
        estoque: parseInt(estoque),
        descricao: descricao.trim(),
        imagemUrl: urlFinal,
        dataAtualizacao: new Date().toISOString()
      };

      if (produtoExistente) {
        await updateDoc(doc(db, 'produtos', produtoExistente.id), dadosDoProduto);
        Alert.alert("Sucesso!", "Produto atualizado na vitrine!");
      } else {
        await addDoc(collection(db, 'produtos'), dadosDoProduto);
        Alert.alert("Sucesso!", "Produto novo cadastrado!");
      }
      navigation.goBack(); 

    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível salvar.");
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
        <Text style={styles.headerTitle}>{produtoExistente ? 'Editar Produto' : 'Novo Produto'}</Text>
      </View>

      <TouchableOpacity style={styles.imagePickerButton} onPress={selecionarImagem}>
        {imagemUri ? (
          <Image source={{ uri: imagemUri }} style={styles.productImagePreview} />
        ) : (
          <>
            <Feather name="camera" size={40} color="#A55C45" />
            <Text style={styles.imagePickerText}>Adicionar Foto do Produto</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Nome do Item *</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Linha Mollet" />

      <View style={styles.row}>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Preço (R$) *</Text>
          <TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="numeric" placeholder="0.00" />
        </View>
        <View style={styles.halfInput}>
          <Text style={styles.label}>Estoque Inicial *</Text>
          <TextInput style={styles.input} value={estoque} onChangeText={setEstoque} keyboardType="numeric" placeholder="Ex: 50" />
        </View>
      </View>

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categoryPicker}>
        {['Linhas', 'Agulhas', 'Barbantes', 'Kits', 'Variados'].map((cat) => (
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
      <TextInput style={[styles.input, { height: 100, textAlignVertical: 'top' }]} value={descricao} onChangeText={setDescricao} multiline />

      <TouchableOpacity style={styles.saveButton} onPress={handleSalvarProduto} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.saveButtonText}>{produtoExistente ? 'SALVAR ALTERAÇÕES' : 'CADASTRAR PRODUTO'}</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}
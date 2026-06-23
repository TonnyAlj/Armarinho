// Arquivo: src/screens/detalhes/DetalhesProdutoScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';

import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

export default function DetalhesProdutoScreen({ route, navigation }: any) {
  const { produto } = route.params; 
  const [isAdmin, setIsAdmin] = useState(false);
  const [adicionando, setAdicionando] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));
        if (userDoc.exists() && userDoc.data().isAdmin) setIsAdmin(true);
      }
    };
    checkAdmin();
  }, []);

  // FUNÇÃO NOVA: ADICIONAR AO CARRINHO NO FIRESTORE
  const handleAdicionarAoCarrinho = async () => {
    if (!auth.currentUser) {
      Alert.alert("Aviso", "Você precisa estar logado para comprar.");
      return;
    }

    setAdicionando(true);
    try {
      await addDoc(collection(db, 'carrinho'), {
        userId: auth.currentUser.uid,
        produtoId: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        imagemUrl: produto.imagemUrl || '',
        quantidade: 1, // Por padrão adiciona 1, você pode expandir isso no futuro
        dataAdicao: new Date().toISOString()
      });
      
      Alert.alert("Sucesso!", "Produto adicionado ao seu carrinho.", [
        { text: "Continuar Comprando", onPress: () => navigation.goBack() },
        { text: "Ir para Carrinho", onPress: () => navigation.navigate('CarrinhoTab') }
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar ao carrinho.");
    } finally {
      setAdicionando(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F1E5' }}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {produto.imagemUrl ? (
            <Image source={{ uri: produto.imagemUrl }} style={styles.productImage} />
          ) : (
            <View style={[styles.productImage, { backgroundColor: '#EADCC8', justifyContent: 'center', alignItems: 'center' }]}>
               <MaterialCommunityIcons name="image-off" size={60} color="#A55C45" />
            </View>
          )}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{produto.categoria}</Text>
          <Text style={styles.title}>{produto.nome}</Text>
          <Text style={styles.price}>R$ {produto.preco.toFixed(2).replace('.', ',')}</Text>
          
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{produto.descricao || "Sem descrição disponível."}</Text>
          
          <Text style={styles.sectionTitle}>Disponibilidade</Text>
          <Text style={styles.stock}>{produto.estoque} unidades em estoque</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buyButton} onPress={handleAdicionarAoCarrinho} disabled={adicionando}>
          {adicionando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buyButtonText}>ADICIONAR AO CARRINHO</Text>
          )}
        </TouchableOpacity>
      </View>

      {isAdmin && (
        <TouchableOpacity style={styles.editFab} onPress={() => navigation.navigate('CadastroProduto', { produto: produto })}>
          <Feather name="edit-2" size={24} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}
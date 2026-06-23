// Arquivo: src/screens/busca/BuscaScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

export default function BuscaScreen({ navigation }: any) {
  const [termoBusca, setTermoBusca] = useState('');
  const [produtosIniciais, setProdutosIniciais] = useState<any[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Busca todos os produtos do banco uma vez
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'produtos'), (snapshot) => {
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProdutosIniciais(lista);
      setProdutosFiltrados(lista); // Começa mostrando tudo
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Filtra a lista sempre que o usuário digitar algo
  const handleBusca = (texto: string) => {
    setTermoBusca(texto);
    if (texto === '') {
      setProdutosFiltrados(produtosIniciais);
    } else {
      const filtrados = produtosIniciais.filter(produto => 
        produto.nome.toLowerCase().includes(texto.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(texto.toLowerCase())
      );
      setProdutosFiltrados(filtrados);
    }
  };

  return (
    <View style={styles.container}>
      {/* BARRA DE PESQUISA */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#A55C45" />
          <TextInput 
            style={styles.searchInput}
            placeholder="O que você está procurando?"
            value={termoBusca}
            onChangeText={handleBusca}
            autoCapitalize="none"
          />
          {termoBusca.length > 0 && (
            <TouchableOpacity onPress={() => handleBusca('')}>
              <Feather name="x-circle" size={20} color="#A55C45" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* RESULTADOS DA BUSCA */}
      {loading ? (
        <ActivityIndicator size="large" color="#C56A47" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={produtosFiltrados}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 20 }}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Feather name="frown" size={50} color="#EADCC8" />
              <Text style={{ marginTop: 15, color: '#A55C45', fontSize: 16 }}>Nenhum produto encontrado.</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('DetalhesProduto', { produto: item })}
            >
              {item.imagemUrl ? (
                <Image source={{ uri: item.imagemUrl }} style={styles.img} />
              ) : (
                <View style={[styles.img, { backgroundColor: '#EADCC8', justifyContent: 'center', alignItems: 'center' }]}>
                  <MaterialCommunityIcons name="image-off" size={30} color="#A55C45" />
                </View>
              )}
              
              <View style={styles.info}>
                <Text style={styles.categoria}>{item.categoria}</Text>
                <Text style={styles.nome} numberOfLines={2}>{item.nome}</Text>
                <Text style={styles.preco}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#A55C45" />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F1E5' },
  header: { paddingTop: Constants.statusBarHeight + 20, paddingHorizontal: 20, paddingBottom: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EADCC8' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F1E5', borderRadius: 10, paddingHorizontal: 15, height: 50, borderWidth: 1, borderColor: '#EADCC8' },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
  card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 15, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, borderWidth: 1, borderColor: '#EADCC8' },
  img: { width: 80, height: 80, borderRadius: 8 },
  info: { flex: 1, marginLeft: 15 },
  categoria: { fontSize: 12, color: '#A55C45', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  preco: { fontSize: 18, color: '#C56A47', fontWeight: 'bold' }
});
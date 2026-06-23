import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { db } from '../../services/firebaseConfig';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default function GerenciarProdutosScreen({ navigation }: any) {
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'produtos'), (snapshot) => {
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProdutos(lista);
    });
    return () => unsubscribe();
  }, []);

  const confirmarExclusao = (id: string) => {
    Alert.alert("Excluir Produto", "Tem certeza que deseja apagar este item?", [
      { text: "Cancelar" },
      { text: "Excluir", style: "destructive", onPress: async () => {
          try { await deleteDoc(doc(db, 'produtos', id)); } 
          catch (error) { Alert.alert("Erro", "Não foi possível excluir."); }
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#A55C45" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gerenciar Vitrine</Text>
      </View>

      <FlatList
        data={produtos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imagemUrl ? (
              <Image source={{ uri: item.imagemUrl }} style={styles.img} />
            ) : (
              <View style={[styles.img, { backgroundColor: '#EADCC8', justifyContent: 'center', alignItems: 'center' }]}>
                <Feather name="image" size={20} color="#A55C45" />
              </View>
            )}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.nome} numberOfLines={1}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate('CadastroProduto', { produto: item })}>
                <Feather name="edit-2" size={22} color="#4A90E2" style={{ marginRight: 15 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarExclusao(item.id)}>
                <Feather name="trash-2" size={22} color="#E63946" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F1E5', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingTop: 30 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#A55C45', marginLeft: 15 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', padding: 10, borderRadius: 10, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: '#EADCC8' },
  img: { width: 50, height: 50, borderRadius: 5 },
  nome: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  preco: { color: '#888', marginTop: 2 },
  actions: { flexDirection: 'row', paddingRight: 5 }
});
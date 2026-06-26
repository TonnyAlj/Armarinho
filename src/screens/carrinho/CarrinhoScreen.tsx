// Arquivo: src/screens/carrinho/CarrinhoScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { auth, db } from '../../services/firebaseConfig';
import { collection, query, where, onSnapshot, doc, deleteDoc, addDoc } from 'firebase/firestore';

export default function CarrinhoScreen({ navigation }: any) {
  const [itensCarrinho, setItensCarrinho] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [finalizando, setFinalizando] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;

    // Busca apenas os itens no carrinho do usuário atual
    const q = query(collection(db, 'carrinho'), where('userId', '==', auth.currentUser.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItensCarrinho(lista);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalCarrinho = itensCarrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);

  const removerItem = async (id: string) => {
    try { await deleteDoc(doc(db, 'carrinho', id)); } 
    catch (error) { Alert.alert("Erro", "Não foi possível remover o item."); }
  };

  const handleFinalizarCompra = async () => {
    // Força a busca do usuário diretamente da instância ativa do Firebase Auth
    const usuarioLogado = auth.currentUser;

    if (!usuarioLogado) {
      Alert.alert("Erro de Sessão", "Não encontramos nenhum usuário logado. Faça login novamente.");
      return;
    }

    if (itensCarrinho.length === 0) {
      Alert.alert("Carrinho Vazio", "Adicione produtos antes de finalizar.");
      return;
    }

    setFinalizando(true);

    try {
      const totalPedido = totalCarrinho;

      const dadosDoPedido = {
        // Envia o UID limpo e garante que é uma String estável
        clienteId: String(usuarioLogado.uid).trim(), 
        clienteEmail: usuarioLogado.email,
        data: new Date().toISOString(), 
        total: totalPedido,
        status: 'Pendente', 
        itens: itensCarrinho.map(item => ({
          produtoId: item.id,
          nome: item.nome,
          precoUnitario: item.preco,
          quantidade: item.quantidade
        }))
      };

      // LOG DE DIAGNÓSTICO (Aparecerá no seu Web LOG do terminal)
      console.log("=========================================");
      console.log("GRAVANDO PEDIDO NO FIRESTORE:");
      console.log("E-mail do Comprador:", usuarioLogado.email);
      console.log("UID do Comprador (clienteId):", usuarioLogado.uid);
      console.log("=========================================");

      await addDoc(collection(db, 'pedidos'), dadosDoPedido);
      
      setFinalizando(false);
      setItensCarrinho([]); // Limpa o carrinho

      Alert.alert(
        "Sucesso!", 
        "Seu pedido foi realizado com sucesso.",
        [{ text: "Ver Meus Pedidos", onPress: () => navigation.navigate('PedidosTab') }]
      );

    } catch (error) {
      console.error("Erro ao gravar pedido:", error);
      Alert.alert("Erro", "Não foi possível finalizar sua compra.");
    } finally {
      setLoading(false);
      setFinalizando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#C56A47" style={{ marginTop: 50 }} />
      ) : itensCarrinho.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="shopping-cart" size={60} color="#EADCC8" />
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('HomeTab')}>
            <Text style={styles.shopButtonText}>IR PARA A VITRINE</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={itensCarrinho}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 20 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.imagemUrl ? (
                  <Image source={{ uri: item.imagemUrl }} style={styles.img} />
                ) : (
                  <View style={[styles.img, { backgroundColor: '#EADCC8', justifyContent: 'center', alignItems: 'center' }]}>
                    <MaterialCommunityIcons name="image-off" size={24} color="#A55C45" />
                  </View>
                )}
                
                <View style={styles.info}>
                  <Text style={styles.nome} numberOfLines={2}>{item.nome}</Text>
                  <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
                  <Text style={styles.qtd}>Qtd: {item.quantidade}</Text>
                </View>

                <TouchableOpacity onPress={() => removerItem(item.id)} style={{ padding: 10 }}>
                  <Feather name="trash-2" size={24} color="#E63946" />
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total da Compra:</Text>
              <Text style={styles.totalValue}>R$ {totalCarrinho.toFixed(2).replace('.', ',')}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleFinalizarCompra} disabled={finalizando}>
              {finalizando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.checkoutButtonText}>FINALIZAR PEDIDO</Text>}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F1E5' },
  header: { paddingTop: Constants.statusBarHeight + 20, paddingBottom: 15, backgroundColor: '#FFF', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EADCC8' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#A55C45' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#A55C45', marginTop: 15, marginBottom: 20 },
  shopButton: { backgroundColor: '#C56A47', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 },
  shopButtonText: { color: '#FFF', fontWeight: 'bold' },
  card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 10, padding: 10, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: '#EADCC8' },
  img: { width: 70, height: 70, borderRadius: 8 },
  info: { flex: 1, marginLeft: 15 },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  preco: { fontSize: 16, color: '#C56A47', fontWeight: 'bold', marginTop: 4 },
  qtd: { fontSize: 12, color: '#888', marginTop: 4 },
  footer: { backgroundColor: '#FFF', padding: 20, borderTopWidth: 1, borderTopColor: '#EADCC8' },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalLabel: { fontSize: 18, color: '#333' },
  totalValue: { fontSize: 22, fontWeight: 'bold', color: '#C56A47' },
  checkoutButton: { backgroundColor: '#34C759', padding: 15, borderRadius: 8, alignItems: 'center' },
  checkoutButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});
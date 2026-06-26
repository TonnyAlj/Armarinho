// Arquivo: src/screens/pedidos/PedidosScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth'; 
import { db, auth } from '../../services/firebaseConfig';

interface ItemPedido {
  produtoId: string;
  nome: string;
  precoUnitario: number;
  quantidade: number;
}

interface Pedido {
  id: string;
  clienteId: string;
  data: string;
  total: number;
  status: string;
  itens?: ItemPedido[];
}

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribePedidos: () => void;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uidLimpo = String(user.uid).trim();

        // LOG DE DIAGNÓSTICO DA BUSCA
        console.log("=========================================");
        console.log("TELA MEUS PEDIDOS ATIVA:");
        console.log("Usuário Logado Visualizando:", user.email);
        console.log("Filtrando banco por clienteId ==:", uidLimpo);
        console.log("=========================================");

        const q = query(
          collection(db, 'pedidos'),
          where('clienteId', '==', uidLimpo)
        );

        unsubscribePedidos = onSnapshot(q, (snapshot) => {
          const lista: Pedido[] = [];
          snapshot.forEach((doc) => {
            lista.push({ id: doc.id, ...doc.data() } as Pedido);
          });
          
          console.log(`Pedidos encontrados para este UID: ${lista.length}`);

          lista.sort((a, b) => {
            const dataA = a.data ? new Date(a.data).getTime() : 0;
            const dataB = b.data ? new Date(b.data).getTime() : 0;
            return dataB - dataA;
          });
          
          setPedidos(lista);
          setLoading(false);
        }, (error) => {
          console.error("Erro Firestore ao buscar pedidos:", error);
          setLoading(false);
        });
      } else {
        console.log("Nenhum usuário detectado pelo Auth na tela de Pedidos.");
        setPedidos([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribePedidos) unsubscribePedidos();
    };
  }, []);

  const handleCancelarPedido = (pedidoId: string) => {
    Alert.alert(
      "Cancelar Pedido",
      "Tem certeza que deseja cancelar esta compra? Esta ação não poderá ser desfeita.",
      [
        { text: "Voltar", style: "cancel" },
        { 
          text: "Sim, Cancelar", 
          style: "destructive",
          onPress: async () => {
            try {
              await updateDoc(doc(db, 'pedidos', pedidoId), { status: 'Cancelado' });
              Alert.alert("Sucesso", "O seu pedido foi cancelado com sucesso!");
            } catch (error) {
              Alert.alert("Erro", "Não foi possível processar o cancelamento.");
            }
          }
        }
      ]
    );
  };

  const getCorStatus = (status: string) => {
    switch (status) {
      case 'Entregue': return '#34C759'; 
      case 'Saiu para entrega': return '#4A90E2'; 
      case 'Aguardando entrega': return '#F5A623'; 
      case 'Cancelado': return '#E63946'; 
      default: return '#C56A47'; 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#C56A47" />
          <Text style={styles.loadingText}>Carregando seu histórico...</Text>
        </View>
      ) : pedidos.length === 0 ? (
        <View style={styles.center}>
          <Feather name="shopping-bag" size={50} color="#EADCC8" />
          <Text style={styles.emptyText}>Você ainda não realizou nenhuma compra.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollList}>
          {pedidos.map((pedido) => (
            <View key={pedido.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.pedidoId}>ID: {pedido.id.slice(0, 8).toUpperCase()}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getCorStatus(pedido.status) }]}>
                  <Text style={styles.statusText}>{pedido.status || 'Pendente'}</Text>
                </View>
              </View>

              <Text style={styles.infoText}>
                <Text style={styles.boldLabel}>Data: </Text> 
                {pedido.data 
                  ? `${new Date(pedido.data).toLocaleDateString('pt-BR')} às ${new Date(pedido.data).toLocaleTimeString('pt-BR').slice(0, 5)}`
                  : 'Data não registrada'}
              </Text>

              {/* LISTA DOS PRODUTOS INCLUÍDOS NO PEDIDO */}
              {pedido.itens && pedido.itens.length > 0 && (
                <View style={styles.produtosContainer}>
                  <Text style={styles.produtosTitle}>Produtos:</Text>
                  {pedido.itens.map((item, index) => (
                    <Text key={index} style={styles.produtoItem}>
                      • {item.nome} <Text style={styles.produtoQtd}>x{item.quantidade}</Text>
                    </Text>
                  ))}
                </View>
              )}
              
              <Text style={styles.infoText}>
                <Text style={styles.boldLabel}>Total: </Text> 
                <Text style={styles.totalDestaque}>R$ {pedido.total ? pedido.total.toFixed(2).replace('.', ',') : '0,00'}</Text>
              </Text>

              {(pedido.status === 'Pendente' || !pedido.status) && (
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => handleCancelarPedido(pedido.id)}
                >
                  <Feather name="x-circle" size={16} color="#E63946" style={styles.buttonIcon} />
                  <Text style={styles.cancelButtonText}>Cancelar Pedido</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F1E5' },
  header: { paddingTop: Constants.statusBarHeight + 20, paddingHorizontal: 20, paddingBottom: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EADCC8' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#A55C45' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { marginTop: 10, color: '#A55C45' },
  emptyText: { color: '#888', marginTop: 10, fontSize: 16, textAlign: 'center' },
  scrollList: { padding: 20, paddingBottom: 40 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#EADCC8', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#F7F1E5' },
  pedidoId: { fontSize: 13, fontWeight: 'bold', color: '#888' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  infoText: { fontSize: 15, color: '#333', marginBottom: 6 },
  boldLabel: { fontWeight: '700', color: '#555' },
  
  // NOVOS ESTILOS PARA EXIBIR OS PRODUTOS
  produtosContainer: { backgroundColor: '#F7F1E5', borderRadius: 8, padding: 10, marginVertical: 10, borderWidth: 1, borderColor: '#EADCC8' },
  produtosTitle: { fontSize: 14, fontWeight: 'bold', color: '#A55C45', marginBottom: 5 },
  produtoItem: { fontSize: 14, color: '#444', marginBottom: 3 },
  produtoQtd: { fontWeight: 'bold', color: '#C56A47' },
  totalDestaque: { color: '#C56A47', fontWeight: 'bold' },

  cancelButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E63946', borderRadius: 8, padding: 10, marginTop: 12, backgroundColor: '#FFF5F5' },
  buttonIcon: { marginRight: 6 },
  cancelButtonText: { color: '#E63946', fontWeight: 'bold', fontSize: 14 }
});
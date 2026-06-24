// Arquivo: src/screens/admin/GerenciarPedidosScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Modal, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

interface Pedido {
  id: string;
  clienteId: string;
  clienteNome?: string;
  data: string;
  total: number;
  status: string;
}

export default function GerenciarPedidosScreen({ navigation }: any) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'pedidos'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista: Pedido[] = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() } as Pedido);
      });
      
      lista.sort((a, b) => {
        const dataA = a.data ? new Date(a.data).getTime() : 0;
        const dataB = b.data ? new Date(b.data).getTime() : 0;
        return dataB - dataA;
      });

      setPedidos(lista);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const abrirModalStatus = (pedidoId: string) => {
    setPedidoSelecionado(pedidoId);
    setModalVisible(true);
  };

  const atualizarNoBanco = async (novoStatus: string) => {
    if (!pedidoSelecionado) return;
    
    try {
      await updateDoc(doc(db, 'pedidos', pedidoSelecionado), { status: novoStatus });
      setModalVisible(false); 
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status no banco de dados.");
    }
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#A55C45" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestão de Pedidos</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#C56A47" />
          <Text style={styles.loadingText}>Carregando painel de pedidos...</Text>
        </View>
      ) : pedidos.length === 0 ? (
        <View style={styles.center}>
          <Feather name="inbox" size={50} color="#EADCC8" />
          <Text style={styles.emptyText}>Nenhum pedido foi feito ainda.</Text>
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
                  : 'Data não registrada no sistema'}
              </Text>
              
              <Text style={styles.infoText}>
                <Text style={styles.boldLabel}>Valor Total: </Text> 
                R$ {pedido.total ? pedido.total.toFixed(2).replace('.', ',') : '0,00'}
              </Text>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => abrirModalStatus(pedido.id)}
              >
                <Feather name="edit" size={16} color="#FFF" style={styles.buttonIcon} />
                <Text style={styles.actionButtonText}>Alterar Status</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* MODAL DE ALTERAÇÃO DE STATUS */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar Status</Text>
            
            <TouchableOpacity style={styles.statusOption} onPress={() => atualizarNoBanco('Em separação')}>
              <Text style={styles.statusOptionText}>Em separação</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.statusOption} onPress={() => atualizarNoBanco('Aguardando entrega')}>
              <Text style={styles.statusOptionText}>Aguardando entrega</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.statusOption} onPress={() => atualizarNoBanco('Saiu para entrega')}>
              <Text style={styles.statusOptionText}>Saiu para entrega</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.statusOption, styles.noBorder]} onPress={() => atualizarNoBanco('Entregue')}>
              <Text style={[styles.statusOptionText, styles.deliverySuccessText]}>Entregue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F1E5' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: Constants.statusBarHeight + 20, paddingHorizontal: 20, paddingBottom: 15, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EADCC8' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#A55C45', marginLeft: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { marginTop: 10, color: '#A55C45' },
  emptyText: { color: '#888', marginTop: 10, fontSize: 16 },
  scrollList: { padding: 20, paddingBottom: 40 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#EADCC8', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#F7F1E5' },
  pedidoId: { fontSize: 13, fontWeight: 'bold', color: '#888' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  infoText: { fontSize: 15, color: '#333', marginBottom: 6 },
  boldLabel: { fontWeight: '700', color: '#555' },
  actionButton: { backgroundColor: '#4A90E2', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, marginTop: 12 },
  buttonIcon: { marginRight: 8 },
  actionButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#FFF', borderRadius: 12, padding: 20, width: '85%', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#A55C45', marginBottom: 20, textAlign: 'center' },
  statusOption: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EADCC8' },
  statusOptionText: { fontSize: 16, color: '#333', textAlign: 'center' },
  noBorder: { borderBottomWidth: 0 },
  deliverySuccessText: { color: '#34C759', fontWeight: 'bold' },
  cancelButton: { marginTop: 20, paddingVertical: 12, backgroundColor: '#F7F1E5', borderRadius: 8 },
  cancelButtonText: { fontSize: 16, color: '#A55C45', textAlign: 'center', fontWeight: 'bold' }
});
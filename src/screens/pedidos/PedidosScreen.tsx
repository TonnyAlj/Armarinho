// Arquivo: src/screens/pedidos/PedidosScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { auth, db } from '../../services/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function PedidosScreen() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(collection(db, 'pedidos'), where('userId', '==', auth.currentUser.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Ordena localmente do mais recente para o mais antigo
      lista.sort((a: any, b: any) => new Date(b.dataPedido).getTime() - new Date(a.dataPedido).getTime());
      
      setPedidos(lista);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} às ${data.getHours()}:${data.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#C56A47" style={{ marginTop: 50 }} />
      ) : pedidos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="package" size={60} color="#EADCC8" />
          <Text style={styles.emptyText}>Você ainda não fez nenhum pedido.</Text>
        </View>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.orderId}>Pedido #{item.id.substring(0, 6).toUpperCase()}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
              
              <Text style={styles.dateText}>{formatarData(item.dataPedido)}</Text>
              
              <View style={styles.divider} />
              
              {item.itens.map((prod: any, index: number) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName}>{prod.quantidade}x {prod.nome}</Text>
                  <Text style={styles.itemPrice}>R$ {(prod.preco * prod.quantidade).toFixed(2)}</Text>
                </View>
              ))}
              
              <View style={styles.divider} />
              
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Pago</Text>
                <Text style={styles.totalValue}>R$ {item.total.toFixed(2).replace('.', ',')}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F1E5' },
  header: { paddingTop: Constants.statusBarHeight + 20, paddingBottom: 15, backgroundColor: '#FFF', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EADCC8' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#A55C45' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#A55C45', marginTop: 15 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#EADCC8', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  orderId: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  statusBadge: { backgroundColor: '#EADCC8', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#A55C45', fontSize: 12, fontWeight: 'bold' },
  dateText: { fontSize: 12, color: '#888', marginBottom: 15 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 10 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  itemName: { fontSize: 14, color: '#555', flex: 1 },
  itemPrice: { fontSize: 14, color: '#555', fontWeight: '500' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#C56A47' }
});
// Arquivo: src/screens/pedidos/PedidosScreen.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles'; // Importando o estilo do arquivo separado!

const PEDIDOS_MOCK = [
  {
    id: '1042',
    data: '19/06/2026',
    total: 'R$ 37,40',
    status: 'Em rota',
    itens: '1x Linha Amigurumi, 1x Agulha 3.5mm',
    destino: 'Centro, Medianeira - PR'
  },
  {
    id: '1041',
    data: '10/06/2026',
    total: 'R$ 112,00',
    status: 'Entregue',
    itens: '4x Barbante Especial, 1x Tesoura',
    destino: 'Jardim Irene, Medianeira - PR'
  },
  {
    id: '1035',
    data: '02/05/2026',
    total: 'R$ 45,90',
    status: 'Cancelado',
    itens: '2x Lã Premium, 1x Marcador',
    destino: 'Centro, Matelândia - PR'
  }
];

export default function PedidosScreen() {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue': return '#2E8B57';
      case 'Em rota': return '#E67E22';
      case 'Preparando': return '#E67E22';
      case 'Cancelado': return '#E63946';
      default: return '#888888';
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
      </View>

      <FlatList
        data={PEDIDOS_MOCK}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Pedido #{item.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.orderDate}>Realizado em: {item.data}</Text>
            <Text style={styles.orderItems} numberOfLines={1}>{item.itens}</Text>
            
            <View style={styles.divider} />

            <View style={styles.orderFooter}>
              <View style={styles.destinationContainer}>
                <Feather name="map-pin" size={14} color="#A55C45" />
                <Text style={styles.destinationText}>{item.destino}</Text>
              </View>
              <Text style={styles.orderTotal}>{item.total}</Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
              </TouchableOpacity>
              
              {item.status === 'Entregue' ? (
                <TouchableOpacity style={styles.reorderButton}>
                  <Text style={styles.reorderButtonText}>Pedir Novamente</Text>
                </TouchableOpacity>
              ) : null}
            </View>

          </View>
        )}
      />
    </View>
  );
}
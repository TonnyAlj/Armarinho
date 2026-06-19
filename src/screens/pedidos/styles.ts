// Arquivo: src/screens/pedidos/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F1E5',
    paddingTop: 50, 
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A55C45',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EADCC8',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  orderDate: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0E5D1',
    marginBottom: 12,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  destinationText: {
    fontSize: 13,
    color: '#888',
    marginLeft: 5,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C56A47',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A55C45',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 10, 
  },
  detailsButtonText: {
    color: '#A55C45',
    fontWeight: 'bold',
    fontSize: 14,
  },
  reorderButton: {
    flex: 1,
    backgroundColor: '#C56A47',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
// Arquivo: src/screens/HomeScreen.styles.ts
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'; // Adicione esta linha

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F1E5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // A MÁGICA AQUI: Pega a altura exata da barra de status do celular + 15 de margem
    paddingTop: Constants.statusBarHeight + 15, 
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A55C45',
  },
  banner: {
    backgroundColor: '#D0A28C',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  bannerSubtitle: {
    color: '#FFF',
    fontSize: 14,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EADCC8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryText: {
    color: '#A55C45',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A55C45',
    marginLeft: 20,
    marginBottom: 10,
  },
  productScroll: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 150,
    borderWidth: 1,
    borderColor: '#EADCC8',
  },
  productImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#F0E5D1',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C56A47',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#C56A47',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
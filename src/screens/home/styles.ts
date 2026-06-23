// Arquivo: src/screens/home/styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F1E5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Constants.statusBarHeight + 20, paddingHorizontal: 20, paddingBottom: 15 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#A55C45' },
  
  // Categorias
  categoryContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 25 },
  categoryItem: { alignItems: 'center' },
  categoryCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, borderWidth: 1, borderColor: '#EADCC8', marginBottom: 8 },
  categoryText: { fontSize: 12, color: '#A55C45', fontWeight: '500' },

  // NOVOS BANNERS DE PROMOÇÃO
  promoContainer: { paddingLeft: 20, marginBottom: 25 },
  promoBanner: { 
    width: width * 0.75, // Ocupa 75% da tela, mostrando um pedacinho do próximo banner
    maxWidth: 400, // Limite para o PC não esticar demais
    height: 160, 
    borderRadius: 15, 
    marginRight: 15, 
    overflow: 'hidden', // Faz a imagem respeitar as bordas arredondadas
    backgroundColor: '#EADCC8' 
  },
  promoImage: { width: '100%', height: '100%', position: 'absolute', resizeMode: 'cover' },
  promoOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', padding: 15, justifyContent: 'flex-end' },
  promoTag: { backgroundColor: '#E63946', color: '#FFF', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, fontSize: 10, fontWeight: 'bold', marginBottom: 5, overflow: 'hidden' },
  promoName: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 2, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 },
  promoPrice: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 },

  // Vitrine Horizontal
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginHorizontal: 20, marginBottom: 15 },
  productScroll: { paddingHorizontal: 20, paddingBottom: 30 },
  productCard: { width: 160, backgroundColor: '#FFF', borderRadius: 12, padding: 10, marginRight: 15, borderWidth: 1, borderColor: '#EADCC8', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  productImagePlaceholder: { width: '100%', height: 120, borderRadius: 8, backgroundColor: '#F7F1E5', justifyContent: 'center', alignItems: 'center', marginBottom: 10, overflow: 'hidden' },
  productName: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 5, height: 38 },
  productPrice: { fontSize: 16, color: '#C56A47', fontWeight: 'bold', marginBottom: 10 },
  addButton: { backgroundColor: '#C56A47', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', position: 'absolute', bottom: 10, right: 10 }
});
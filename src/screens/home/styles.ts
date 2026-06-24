import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F7F1E5' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingTop: Constants.statusBarHeight + 20, 
    paddingHorizontal: 20, 
    paddingBottom: 15 
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#A55C45' 
  },
  headerIcons: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  searchIcon: { 
    marginRight: 15 
  },
  
  // CATEGORIAS
  categoryContainer: { 
    marginBottom: 10 
  },
  categoryScrollContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 5 
  },
  categoryItem: { 
    alignItems: 'center', 
    marginRight: 22 
  },
  categoryCircle: { 
    width: 58, 
    height: 58, 
    borderRadius: 29, 
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 3, 
    borderWidth: 1, 
    borderColor: '#EADCC8', 
    marginBottom: 6 
  },
  categoryCircleActive: { 
    backgroundColor: '#C56A47',
    borderColor: '#C56A47'
  },
  categoryText: { 
    fontSize: 13, 
    color: '#A55C45', 
    fontWeight: '500' 
  },
  categoryTextActive: { 
    color: '#C56A47', 
    fontWeight: 'bold' 
  },

  // CARROSSEL (Design de 85% para celulares ficarem perfeitos)
  promoContainer: { 
    marginBottom: 25 
  },
  promoBanner: { 
    width: width > 800 ? 600 : width * 0.82, 
    height: 170, 
    borderRadius: 15, 
    marginLeft: 20,
    overflow: 'hidden', 
    backgroundColor: '#EADCC8',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  promoImage: { 
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
    resizeMode: 'cover' 
  },
  promoImageEmpty: { 
    width: '100%', 
    height: '100%', 
    position: 'absolute', 
    backgroundColor: '#EADCC8' 
  },
  promoOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.35)', 
    padding: 15, 
    justifyContent: 'flex-end' 
  },
  promoTag: { 
    backgroundColor: '#E63946', 
    color: '#FFF', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 4, 
    fontSize: 10, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    overflow: 'hidden' 
  },
  promoName: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 2, 
    textShadowColor: 'rgba(0,0,0,0.6)', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 3 
  },
  promoPrice: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold', 
    textShadowColor: 'rgba(0,0,0,0.6)', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 3 
  },

  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginHorizontal: 20, 
    marginBottom: 15 
  },
  
  // ESTADOS DE CARREGAMENTO / VAZIO
  centerContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 30,
    marginTop: 10
  },
  loadingText: { 
    marginTop: 10, 
    color: '#A55C45' 
  },
  emptyText: { 
    color: '#888', 
    marginTop: 10,
    fontSize: 15
  },

  // VITRINE EM COLUNAS PROPORCIONAIS
  gridContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    paddingHorizontal: 10, 
    paddingBottom: 40 
  },
  productCardGrid: { 
    width: width > 500 ? 165 : (width - 52) / 2, // Ajusta perfeitamente de 2 em 2 no celular, e fixa no PC!
    margin: 8, 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    padding: 12, 
    borderWidth: 1, 
    borderColor: '#EADCC8', 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 3,
    position: 'relative'
  },
  productImagePlaceholder: { 
    width: '100%', 
    height: 120, 
    borderRadius: 8, 
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10, 
    overflow: 'hidden' 
  },
  productImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'contain' // PREVINE DISTORÇÃO: Foto inteira sem cortes!
  },
  productName: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#333', 
    marginBottom: 4, 
    height: 38,
    lineHeight: 18
  },
  productPrice: { 
    fontSize: 15, 
    color: '#C56A47', 
    fontWeight: 'bold', 
    marginTop: 4 
  },
  addButton: { 
    backgroundColor: '#C56A47', 
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute', 
    bottom: 12, 
    right: 12 
  }
});
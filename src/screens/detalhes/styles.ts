// Arquivo: src/screens/detalhes/styles.ts
import { StyleSheet, Dimensions } from 'react-native';

// Pegamos a largura da tela para garantir que a imagem ocupe o espaço correto
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', 
  },
  header: {
    position: 'absolute',
    top: 50, // Espaço para a barra do celular
    left: 20,
    zIndex: 10, // Garante que o botão de voltar fique por cima de tudo
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F7F1E5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // Sombrinha leve
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: width,
    height: 300,
    backgroundColor: '#F0E5D1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20, // Faz a borda branca sobrepor um pouquinho a área da imagem
  },
  categoryText: {
    fontSize: 14,
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#C56A47',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#EADCC8',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A55C45',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24, // Melhora a leitura aumentando o espaço entre as linhas
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EADCC8',
    paddingBottom: 30, // Espaço extra para as barras de baixo do iPhone
  },
  quantityController: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F1E5',
    borderRadius: 8,
    marginRight: 15,
  },
  quantityButton: {
    padding: 15,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A55C45',
    marginHorizontal: 10,
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#C56A47',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  }
});
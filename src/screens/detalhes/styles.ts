// Arquivo: src/screens/detalhes/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // --- ÁREA DA FOTO ---
  imageContainer: {
    width: '100%',
    height: 350, 
    backgroundColor: '#EADCC8',
    alignItems: 'center', // Centraliza a imagem horizontalmente
  },
  productImage: {
    width: '100%',
    maxWidth: 450, // O SEGREDO: No PC, a foto trava em 450px para manter a nitidez
    height: '100%',
    resizeMode: 'contain',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },

  // --- ÁREA DO TEXTO ---
  content: {
    width: '100%',
    maxWidth: 800, // No PC, o texto forma uma coluna centralizada e elegante
    alignSelf: 'center', // Empurra a caixa para o meio do monitor
    padding: 25,
    backgroundColor: '#F7F1E5', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    marginTop: -30, 
    paddingBottom: 110, 
  },
  category: {
    fontSize: 14,
    color: '#A55C45',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C56A47',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24, 
    marginBottom: 20,
  },
  stock: {
    fontSize: 16,
    color: '#4A90E2', 
    fontWeight: '500',
  },

  // --- BARRA INFERIOR (COMPRAR) ---
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxWidth: 800, // O botão acompanha exatamente a largura da caixa de texto
    alignSelf: 'center', // Centraliza o rodapé no PC
    backgroundColor: '#FFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EADCC8',
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buyButton: {
    backgroundColor: '#C56A47',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // --- BOTÃO DO LOJISTA (FLUTUANTE) ---
  editFab: {
    position: 'absolute',
    right: 20,
    bottom: 100, 
    backgroundColor: '#4A90E2', 
    width: 56,
    height: 56,
    borderRadius: 28, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});
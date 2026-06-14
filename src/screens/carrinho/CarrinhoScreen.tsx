// Arquivo: src/screens/carrinho/CarrinhoScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import styles from './styles';

// 1. DADOS INICIAIS (Mock): Simulamos que o usuário já adicionou dois itens.
// Note que o preço aqui é um NÚMERO (14.90) e não um texto ('R$ 14,90'), 
// para podermos fazer contas matemáticas de soma e multiplicação.
const ITENS_INICIAIS = [
  { id: '1', nome: 'Linha Círculo Amigurumi (Cor 2012)', preco: 14.90, quantidade: 2 },
  { id: '2', nome: 'Linha para Cachecol de Crochê', preco: 22.50, quantidade: 1 },
];

export default function CarrinhoScreen() {
  // 2. O ESTADO DO CARRINHO: Guarda a lista de produtos atual.
  const [carrinho, setCarrinho] = useState(ITENS_INICIAIS);

  // 3. FUNÇÃO DE ATUALIZAR QUANTIDADE: Essa é uma regra de ouro no React!
  // Nós nunca modificamos a lista diretamente. Nós criamos uma "cópia" da lista (.map),
  // alteramos o que precisa, e salvamos essa nova lista no estado.
  const alterarQuantidade = (id: string, operacao: 'somar' | 'subtrair') => {
    const novoCarrinho = carrinho.map((item) => {
      if (item.id === id) {
        let novaQuantidade = operacao === 'somar' ? item.quantidade + 1 : item.quantidade - 1;
        // Impede que a quantidade fique menor que 1 (se for zero, o ideal seria um botão de "Remover item")
        if (novaQuantidade < 1) novaQuantidade = 1; 
        return { ...item, quantidade: novaQuantidade };
      }
      return item;
    });
    
    setCarrinho(novoCarrinho);
  };

  // 4. CÁLCULO DINÂMICO (Reduce): O método .reduce() percorre a lista inteira
  // e vai acumulando um valor. Aqui, ele multiplica o preço pela quantidade de cada item e soma tudo.
  const valorTotal = carrinho.reduce((acumulador, item) => {
    return acumulador + (item.preco * item.quantidade);
  }, 0);

  const finalizarPedido = () => {
    Alert.alert("Sucesso!", `Seu pedido no valor de R$ ${valorTotal.toFixed(2).replace('.', ',')} foi enviado para o armarinho.`);
  };

  return (
    <View style={styles.container}>
      
      {/* CABEÇALHO SIMPLES */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
      </View>

      {/* LISTA DE PRODUTOS */}
      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.nome}</Text>
              {/* .toFixed(2) garante que sempre tenhamos 2 casas decimais (ex: 14.90) */}
              <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
            </View>

            {/* CONTROLES DE QUANTIDADE (+ e -) */}
            <View style={styles.quantityController}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => alterarQuantidade(item.id, 'subtrair')}
              >
                <Feather name="minus" size={16} color="#A55C45" />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{item.quantidade}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => alterarQuantidade(item.id, 'somar')}
              >
                <Feather name="plus" size={16} color="#A55C45" />
              </TouchableOpacity>
            </View>

          </View>
        )}
      />

      {/* RODAPÉ COM O TOTAL E BOTÃO DE FINALIZAR */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total da compra:</Text>
          <Text style={styles.totalValue}>R$ {valorTotal.toFixed(2).replace('.', ',')}</Text>
        </View>
        
        <TouchableOpacity style={styles.checkoutButton} onPress={finalizarPedido}>
          <Text style={styles.checkoutButtonText}>FINALIZAR PEDIDO</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
// Arquivo: src/screens/busca/BuscaScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import styles from './styles';

// 1. DADOS SIMULADOS (Mock): Uma lista de objetos que imita o retorno de um banco de dados
const PRODUTOS_MOCK = [
  { id: '1', nome: 'Fio Amigurumi Círculo', categoria: 'Linhas', preco: 'R$ 14,90' },
  { id: '2', nome: 'Barbante Especial para Sousplat de Luxo', categoria: 'Barbantes', preco: 'R$ 22,50' },
  { id: '3', nome: 'Lã Premium para Cachecol Masculino', categoria: 'Lãs', preco: 'R$ 18,90' },
  { id: '4', nome: 'Agulha de Crochê 3.5mm', categoria: 'Agulhas', preco: 'R$ 12,00' },
  { id: '5', nome: 'Enchimento Fibra Siliconada', categoria: 'Acessórios', preco: 'R$ 15,50' },
];

const CATEGORIAS = ['Todos', 'Linhas', 'Barbantes', 'Lãs', 'Agulhas', 'Acessórios'];

export default function BuscaScreen() {
  // 2. ESTADOS (useState): Eles são a "memória" do componente. 
  // Sempre que 'busca' ou 'categoriaAtiva' mudam, o React atualiza a tela automaticamente.
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  // 3. LÓGICA DE FILTRO: Misturamos a barra de pesquisa com o botão de categoria
  const produtosFiltrados = PRODUTOS_MOCK.filter(produto => {
    const matchCategoria = categoriaAtiva === 'Todos' || produto.categoria === categoriaAtiva;
    const matchBusca = produto.nome.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <View style={styles.container}>
      
      {/* BARRA DE PESQUISA */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#A55C45" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar fios, agulhas, acessórios..."
          value={busca}
          onChangeText={setBusca} // Atualiza a "memória" a cada letra digitada
        />
      </View>

      {/* LISTA HORIZONTAL DE CATEGORIAS */}
      <View>
        <FlatList
          horizontal // Faz a lista rolar para os lados
          showsHorizontalScrollIndicator={false}
          data={CATEGORIAS}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity 
              // Se a categoria for a ativa, aplicamos um estilo diferente (botão preenchido)
              style={[styles.categoryButton, categoriaAtiva === item && styles.categoryButtonActive]}
              onPress={() => setCategoriaAtiva(item)}
            >
              <Text style={[styles.categoryText, categoriaAtiva === item && styles.categoryTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* LISTA VERTICAL DE PRODUTOS */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        // renderItem é como o React Native desenha CADA item da sua lista
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.nome}</Text>
              <Text style={styles.productCategory}>{item.categoria}</Text>
              <Text style={styles.productPrice}>{item.preco}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Feather name="plus" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
        // O que mostrar se a pesquisa não encontrar nada:
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
        }
      />
    </View>
  );
}
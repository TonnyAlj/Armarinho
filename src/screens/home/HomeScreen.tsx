// Arquivo: src/screens/home/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles'; 

// 1. IMPORTAÇÕES DO FIREBASE
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

// 2. DEFINIÇÃO DO TIPO DO PRODUTO (Ajuda o código a não se perder)
interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  descricao: string;
  estoque: number;
  icone: string;
}

export default function HomeScreen({ navigation }: any) {
  // 3. ESTADOS DA TELA
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  // 4. CONECTANDO COM O BANCO DE DADOS EM TEMPO REAL
  useEffect(() => {
    // Aponta para a coleção 'produtos' lá no Firestore
    const produtosRef = collection(db, 'produtos');

    // O onSnapshot fica "escutando" as mudanças na coleção
    const unsubscribe = onSnapshot(produtosRef, (snapshot) => {
      const listaProdutos: Produto[] = [];
      
      snapshot.forEach((doc) => {
        const dados = doc.data();
        listaProdutos.push({
          id: doc.id, // O ID único que o Firebase gerou
          nome: dados.nome,
          preco: dados.preco,
          categoria: dados.categoria,
          descricao: dados.descricao,
          estoque: dados.estoque,
          icone: dados.icone || 'basket-outline' // Ícone padrão caso falte
        });
      });

      setProdutos(listaProdutos); // Atualiza a vitrine
      setLoading(false); // Desliga a bolinha de carregamento
    });

    // Boa prática: desliga a "escuta" se o usuário fechar o aplicativo
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ponto a Ponto</Text>
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <Feather name="search" size={24} color="#A55C45" style={{ marginRight: 15 }} />
          <TouchableOpacity onPress={() => navigation.navigate('PerfilTab')}>
             <Feather name="user" size={24} color="#A55C45" />
          </TouchableOpacity>
        </View>
      </View>

      {/* BANNER PROMOCIONAL */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>KIT INICIANTE EM PROMOÇÃO!</Text>
        <Text style={styles.bannerSubtitle}>Aproveite a entrega rápida.</Text>
      </View>

      {/* CATEGORIAS RÁPIDAS */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.categoryCircle}>
            <MaterialCommunityIcons name="format-list-bulleted" size={30} color="#A55C45" />
          </View>
          <Text style={styles.categoryText}>Linhas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.categoryCircle}>
            <MaterialCommunityIcons name="needle" size={30} color="#A55C45" />
          </View>
          <Text style={styles.categoryText}>Agulhas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.categoryCircle}>
            <MaterialCommunityIcons name="button-pointer" size={30} color="#A55C45" />
          </View>
          <Text style={styles.categoryText}>Botões</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.categoryCircle}>
            <MaterialCommunityIcons name="palette" size={30} color="#A55C45" />
          </View>
          <Text style={styles.categoryText}>Tecidos</Text>
        </TouchableOpacity>
      </View>

      {/* SEÇÃO MAIS VENDIDOS (Agora puxando da nuvem!) */}
      <Text style={styles.sectionTitle}>Nossa Vitrine</Text>
      
      {loading ? (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
           <ActivityIndicator size="large" color="#C56A47" />
           <Text style={{ marginTop: 10, color: '#A55C45' }}>Buscando produtos...</Text>
        </View>
      ) : produtos.length === 0 ? (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#888' }}>Nenhum produto cadastrado ainda.</Text>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.productScroll}
        >
          {produtos.map((produto) => (
            <TouchableOpacity 
              key={produto.id} 
              style={styles.productCard}
              // Envia o produto real do banco para a tela de Detalhes!
              onPress={() => navigation.navigate('DetalhesProduto', { produto: produto })}
            >
              <View style={styles.productImagePlaceholder}>
                 <MaterialCommunityIcons name={produto.icone as any} size={40} color="#C56A47" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>{produto.nome}</Text>
              <Text style={styles.productPrice}>R$ {produto.preco.toFixed(2).replace('.', ',')}</Text>
              
              <View style={styles.addButton}>
                <Feather name="plus" size={16} color="#FFF" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

    </ScrollView>
  );
}
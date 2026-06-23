// Arquivo: src/screens/home/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles'; 

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  descricao: string;
  estoque: number;
  imagemUrl: string;
  icone: string;
}

export default function HomeScreen({ navigation }: any) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('Todas');

  useEffect(() => {
    const produtosRef = collection(db, 'produtos');

    const unsubscribe = onSnapshot(produtosRef, (snapshot) => {
      const listaProdutos: Produto[] = [];
      
      snapshot.forEach((doc) => {
        const dados = doc.data();
        listaProdutos.push({
          id: doc.id,
          nome: dados.nome,
          preco: dados.preco,
          categoria: dados.categoria,
          descricao: dados.descricao,
          estoque: dados.estoque,
          imagemUrl: dados.imagemUrl || '',
          icone: dados.icone || 'basket-outline' 
        });
      });

      setProdutos(listaProdutos);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const produtosExibidos = categoriaAtiva === 'Todas' 
    ? produtos 
    : produtos.filter(produto => produto.categoria === categoriaAtiva);

  // SEPARANDO OS PRODUTOS PARA OS BANNERS DE PROMOÇÃO (Pegamos os 3 primeiros da lista)
  const produtosEmDestaque = produtos.slice(0, 3);

  // CATEGORIA ALTERADA DE 'Kits' PARA 'Variados' COM NOVO ÍCONE
  const listaDeCategorias = [
    { nome: 'Linhas', icone: 'format-list-bulleted' },
    { nome: 'Agulhas', icone: 'needle' },
    { nome: 'Barbantes', icone: 'basket' },
    { nome: 'Kits', icone: 'basket' },
    { nome: 'Variados', icone: 'shape-outline' } 
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ponto a Ponto</Text>
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <Feather name="search" size={24} color="#A55C45" style={{ marginRight: 15 }} />
          <TouchableOpacity onPress={() => navigation.navigate('PerfilTab')}>
             <Feather name="user" size={24} color="#A55C45" />
          </TouchableOpacity>
        </View>
      </View>

      {/* CARROSSEL DE BANNERS PROMOCIONAIS DINÂMICOS */}
      {categoriaAtiva === 'Todas' && produtosEmDestaque.length > 0 && (
        <View style={styles.promoContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {produtosEmDestaque.map((produto) => (
              <TouchableOpacity 
                key={`promo-${produto.id}`} 
                style={styles.promoBanner}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('DetalhesProduto', { produto: produto })}
              >
                {/* Imagem de Fundo do Banner */}
                {produto.imagemUrl ? (
                  <Image source={{ uri: produto.imagemUrl }} style={styles.promoImage} />
                ) : (
                  <View style={[styles.promoImage, { backgroundColor: '#EADCC8' }]} />
                )}
                
                {/* Camada Escura por Cima da Foto para a Letra Ficar Legível */}
                <View style={styles.promoOverlay}>
                  <Text style={styles.promoTag}>OFERTA ESPECIAL</Text>
                  <Text style={styles.promoName} numberOfLines={1}>{produto.nome}</Text>
                  <Text style={styles.promoPrice}>R$ {produto.preco.toFixed(2).replace('.', ',')}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* BOTÕES DE CATEGORIA */}
      <View style={styles.categoryContainer}>
        {listaDeCategorias.map((cat) => {
          const isAtiva = categoriaAtiva === cat.nome;
          return (
            <TouchableOpacity 
              key={cat.nome}
              style={styles.categoryItem}
              onPress={() => setCategoriaAtiva(isAtiva ? 'Todas' : cat.nome)}
            >
              <View style={[styles.categoryCircle, isAtiva && { backgroundColor: '#C56A47' }]}>
                <MaterialCommunityIcons 
                  name={cat.icone as any} 
                  size={30} 
                  color={isAtiva ? '#FFF' : '#A55C45'} 
                />
              </View>
              <Text style={[styles.categoryText, isAtiva && { color: '#C56A47', fontWeight: 'bold' }]}>
                {cat.nome}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>
        {categoriaAtiva === 'Todas' ? 'Nossa Vitrine' : `Vitrine: ${categoriaAtiva}`}
      </Text>
      
      {loading ? (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
           <ActivityIndicator size="large" color="#C56A47" />
           <Text style={{ marginTop: 10, color: '#A55C45' }}>Buscando produtos...</Text>
        </View>
      ) : produtosExibidos.length === 0 ? (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <MaterialCommunityIcons name="emoticon-sad-outline" size={50} color="#EADCC8" />
          <Text style={{ color: '#888', marginTop: 10 }}>Nenhum produto nesta categoria.</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productScroll}>
          {produtosExibidos.map((produto) => (
            <TouchableOpacity key={produto.id} style={styles.productCard} onPress={() => navigation.navigate('DetalhesProduto', { produto: produto })}>
              <View style={styles.productImagePlaceholder}>
                {produto.imagemUrl ? (
                  <Image source={{ uri: produto.imagemUrl }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                ) : (
                  <MaterialCommunityIcons name={produto.icone as any} size={40} color="#C56A47" />
                )}
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
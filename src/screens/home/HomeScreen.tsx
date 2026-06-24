import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles'; 

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

const { width } = Dimensions.get('window');

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

  // LÓGICA DE FILTRAGEM PROTEGIDA CONTRA MAIÚSCULAS/MINÚSCULAS
  const produtosExibidos = categoriaAtiva === 'Todas' 
    ? produtos 
    : produtos.filter(produto => 
        produto.categoria && produto.categoria.trim().toLowerCase() === categoriaAtiva.trim().toLowerCase()
      );

  const produtosEmDestaque = produtos.slice(0, 3);

  const listaDeCategorias = [
    { nome: 'Linhas', icone: 'yarn' }, 
    { nome: 'Agulhas', icone: 'needle' },
    { nome: 'Barbantes', icone: 'basket' },
    { nome: 'Kits', icone: 'gift' },
    { nome: 'Variados', icone: 'shape-outline' }
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ponto a Ponto</Text>
          <View style={styles.headerIcons}>
            <Feather name="search" size={24} color="#A55C45" style={styles.searchIcon} />
            <TouchableOpacity onPress={() => navigation.navigate('PerfilTab')}>
               <Feather name="user" size={24} color="#A55C45" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CARROSSEL DE OFERTAS (DEIXA A PONTINHA VISÍVEL NO CELULAR) */}
        {categoriaAtiva === 'Todas' && produtosEmDestaque.length > 0 && (
          <View style={styles.promoContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              snapToAlignment="start"
              decelerationRate="fast"
            >
              {produtosEmDestaque.map((produto) => (
                <TouchableOpacity 
                  key={`promo-${produto.id}`} 
                  style={styles.promoBanner}
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('DetalhesProduto', { produto: produto })}
                >
                  {produto.imagemUrl ? (
                    <Image source={{ uri: produto.imagemUrl }} style={styles.promoImage} />
                  ) : (
                    <View style={styles.promoImageEmpty} />
                  )}
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

        {/* BARRA HORIZONTAL DE CATEGORIAS */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScrollContent}>
            {listaDeCategorias.map((cat) => {
              const isAtiva = categoriaAtiva.trim().toLowerCase() === cat.nome.trim().toLowerCase();
              return (
                <TouchableOpacity 
                  key={cat.nome}
                  style={styles.categoryItem}
                  onPress={() => setCategoriaAtiva(isAtiva ? 'Todas' : cat.nome)}
                >
                  <View style={[styles.categoryCircle, isAtiva && styles.categoryCircleActive]}>
                    <MaterialCommunityIcons name={cat.icone as any} size={26} color={isAtiva ? '#FFF' : '#A55C45'} />
                  </View>
                  <Text style={[styles.categoryText, isAtiva && styles.categoryTextActive]}>{cat.nome}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* TÍTULO DA VITRINE */}
        <Text style={styles.sectionTitle}>
          {categoriaAtiva === 'Todas' ? 'Nossa Vitrine' : `Vitrine: ${categoriaAtiva}`}
        </Text>
        
        {/* RENDERIZAÇÃO DOS PRODUTOS */}
        {loading ? (
          <View style={styles.centerContainer}>
             <ActivityIndicator size="large" color="#C56A47" />
             <Text style={styles.loadingText}>Buscando produtos...</Text>
          </View>
        ) : produtosExibidos.length === 0 ? (
          <View style={styles.centerContainer}>
            <MaterialCommunityIcons name="emoticon-sad-outline" size={50} color="#EADCC8" />
            <Text style={styles.emptyText}>Nenhum produto nesta categoria.</Text>
          </View>
        ) : (
          
          /* GRADE VERTICAL TOTALMENTE CORRIGIDA (2 COLUNAS NO CELULAR) */
          <View style={styles.gridContainer}>
            {produtosExibidos.map((produto) => (
              <TouchableOpacity key={produto.id} style={styles.productCardGrid} onPress={() => navigation.navigate('DetalhesProduto', { produto: produto })}>
                <View style={styles.productImagePlaceholder}>
                  {produto.imagemUrl ? (
                    <Image source={{ uri: produto.imagemUrl }} style={styles.productImage} />
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
          </View>
        )}
      </ScrollView>
    </View>
  );
}
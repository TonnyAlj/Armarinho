// Arquivo: src/screens/home/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles'; // Usa o styles.ts que já criamos e ajustamos com Constants!

// 1. DADOS SIMULADOS DA VITRINE
// Colocamos as informações completas para que a Tela de Detalhes saiba o que mostrar
const PRODUTOS_DESTAQUE = [
  {
    id: '1',
    nome: 'Linha Círculo Amigurumi (Cor 2012)',
    preco: 14.90,
    categoria: 'Linhas',
    descricao: 'Fio 100% algodão mercerizado, ideal para a confecção de amigurumis, chaveirinhos detalhados e tapetes de alta qualidade. Possui espessura perfeita para garantir que a sua peça fique firme e facilita a técnica de costura invisível.',
    estoque: 12,
    icone: 'basket-outline'
  },
  {
    id: '2',
    nome: 'Agulhas Darning N° 7',
    preco: 8.50,
    categoria: 'Agulhas',
    descricao: 'Conjunto de agulhas de alta resistência em aço niquelado, perfeitas para arremates e costuras invisíveis em suas peças de crochê e tricô.',
    estoque: 25,
    icone: 'needle'
  }
];

// 2. ADICIONANDO O { navigation } NOS PARÂMETROS DA FUNÇÃO
export default function HomeScreen({ navigation }: any) {
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ponto a Ponto</Text>
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <Feather name="search" size={24} color="#A55C45" style={{ marginRight: 15 }} />
          <Feather name="user" size={24} color="#A55C45" />
        </View>
      </View>

      {/* 2. Banner Promocional */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>KIT INICIANTE EM PROMOÇÃO!</Text>
        <Text style={styles.bannerSubtitle}>Aproveite a entrega rápida.</Text>
      </View>

      {/* 3. Categorias Rápidas */}
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

      {/* 4. Seção Mais Vendidos */}
      <Text style={styles.sectionTitle}>Mais Vendidos</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.productScroll}
      >
        {/* 3. O MAP RENDERIZA OS PRODUTOS DINAMICAMENTE */}
        {PRODUTOS_DESTAQUE.map((produto) => (
          
          <TouchableOpacity 
            key={produto.id} 
            style={styles.productCard}
            // 4. A NAVEGAÇÃO ACONTECE AQUI! 
            // Passamos o nome da rota ('DetalhesProduto') e enviamos o objeto 'produto' inteiro junto.
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

    </ScrollView>
  );
}
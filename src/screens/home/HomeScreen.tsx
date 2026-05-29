// Arquivo: src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'; // Importando ícones
import { styles } from './styles';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ponto a Ponto</Text>
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <Feather name="search" size={24} color="#A55C45" />
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
      
      {/* ScrollView Horizontal para a vitrine de produtos */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.productScroll}
      >
        {/* Produto 1 (Mock) */}
        <View style={styles.productCard}>
          <View style={styles.productImagePlaceholder}>
           <MaterialCommunityIcons name="basket-outline" size={40} color="#C56A47" />
          </View>
          <Text style={styles.productName} numberOfLines={2}>Linha Círculo Amigurumi (Cor 2012)</Text>
          <Text style={styles.productPrice}>R$ 14,90</Text>
          <TouchableOpacity style={styles.addButton}>
            <Feather name="plus" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Produto 2 (Mock) */}
        <View style={styles.productCard}>
          <View style={styles.productImagePlaceholder}>
            <MaterialCommunityIcons name="needle" size={40} color="#A55C45" />
          </View>
          <Text style={styles.productName} numberOfLines={2}>Agulhas Darning N° 7</Text>
          <Text style={styles.productPrice}>R$ 8,50</Text>
          <TouchableOpacity style={styles.addButton}>
            <Feather name="plus" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

    </ScrollView>
  );
}
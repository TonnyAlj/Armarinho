// Arquivo: src/screens/detalhes/DetalhesProdutoScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles'; 

export default function DetalhesProdutoScreen({ route, navigation }: any) {
  // 1. RECEBENDO OS PARÂMETROS DA TELA ANTERIOR
  // Se a tela anterior passou um produto, nós usamos. Se não, usamos o MOCK de segurança.
  const produto = route.params?.produto || {
    id: '1',
    nome: 'Fio Círculo Amigurumi (Cor 2012)',
    preco: 14.90,
    categoria: 'Linhas',
    descricao: 'Fio 100% algodão mercerizado, ideal para a confecção de amigurumis, chaveirinhos detalhados e tapetes de alta qualidade. Possui espessura perfeita para garantir que a sua peça fique firme e facilita a técnica de costura invisível para um acabamento impecável.',
    estoque: 12
  };

  // 2. ESTADO PARA A QUANTIDADE
  const [quantidade, setQuantidade] = useState(1);

  // 3. FUNÇÕES DE CONTROLE
  const alterarQuantidade = (operacao: 'somar' | 'subtrair') => {
    if (operacao === 'somar') {
      if (quantidade < produto.estoque) setQuantidade(quantidade + 1);
    } else {
      if (quantidade > 1) setQuantidade(quantidade - 1);
    }
  };

  const adicionarAoCarrinho = () => {
    const totalParcial = (produto.preco * quantidade).toFixed(2).replace('.', ',');
    Alert.alert(
      "Adicionado!", 
      `${quantidade}x ${produto.nome} no valor total de R$ ${totalParcial} foram para o seu carrinho.`,
      [{ text: "Continuar Comprando", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      
      {/* CABEÇALHO FLUTUANTE (Botão de Voltar) */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#A55C45" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* ÁREA DA IMAGEM DO PRODUTO (Mock com Ícone) */}
        <View style={styles.imageContainer}>
          <MaterialCommunityIcons name="basket-outline" size={100} color="#C56A47" />
        </View>

        {/* INFORMAÇÕES DO PRODUTO */}
        <View style={styles.infoContainer}>
          <Text style={styles.categoryText}>{produto.categoria}</Text>
          <Text style={styles.productName}>{produto.nome}</Text>
          <Text style={styles.productPrice}>R$ {produto.preco.toFixed(2).replace('.', ',')}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.descriptionText}>{produto.descricao}</Text>

        </View>
      </ScrollView>

      {/* RODAPÉ FIXO (Controles e Botão de Adicionar) */}
      <View style={styles.footer}>
        <View style={styles.quantityController}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => alterarQuantidade('subtrair')}>
            <Feather name="minus" size={20} color="#A55C45" />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{quantidade}</Text>
          
          <TouchableOpacity style={styles.quantityButton} onPress={() => alterarQuantidade('somar')}>
            <Feather name="plus" size={20} color="#A55C45" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={adicionarAoCarrinho}>
          <Feather name="shopping-cart" size={20} color="#FFF" />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
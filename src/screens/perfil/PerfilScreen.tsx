// Arquivo: src/screens/perfil/PerfilScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { styles } from './styles';

// 1. DADOS SIMULADOS (Mock)
const USUARIO = {
  nome: 'Tonny Neto',
  email: 'tonny@email.com',
  membroDesde: '2026',
};

// 2. COMPONENTE REUTILIZÁVEL (Mini-componente)
// Criamos isso para não ter que repetir as Views e Textos de cada botão do menu.
// O TypeScript nos ajuda a definir que esse botão precisa de um 'icon', um 'title' e uma função 'onPress'.
interface MenuItemProps {
  icon: any; // Usamos 'any' aqui para facilitar com os nomes dos ícones do Feather
  title: string;
  onPress: () => void;
  isDestructive?: boolean; // Propriedade opcional para o botão de "Sair" ficar vermelho
}

const MenuItem = ({ icon, title, onPress, isDestructive = false }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Feather name={icon} size={22} color={isDestructive ? '#E63946' : '#A55C45'} />
      <Text style={[styles.menuItemText, isDestructive && { color: '#E63946' }]}>
        {title}
      </Text>
    </View>
    {/* A setinha para a direita indica que aquele botão abre uma nova tela */}
    {!isDestructive && <Feather name="chevron-right" size={20} color="#EADCC8" />}
  </TouchableOpacity>
);

export default function PerfilScreen({ navigation }: any) {
  
  // 3. LÓGICA DE LOGOUT (Sair da Conta)
  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja desconectar do aplicativo?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive",
          onPress: () => {
            // Volta para a tela de Login e limpa o histórico de navegação
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* CABEÇALHO DO PERFIL (Foto e Nome) */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {/* Pegamos a primeira letra do nome para o Avatar */}
          <Text style={styles.avatarText}>{USUARIO.nome.charAt(0)}</Text>
        </View>
        <Text style={styles.userName}>{USUARIO.nome}</Text>
        <Text style={styles.userEmail}>{USUARIO.email}</Text>
      </View>

      {/* SEÇÃO DE OPÇÕES (Utilizando nosso componente reutilizável) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minha Conta</Text>
        
        <MenuItem 
          icon="map-pin" 
          title="Endereços de Entrega" 
          onPress={() => Alert.alert("Aviso", "Tela de endereços em construção!")} 
        />
        <MenuItem 
          icon="credit-card" 
          title="Formas de Pagamento" 
          onPress={() => Alert.alert("Aviso", "Tela de pagamentos em construção!")} 
        />
        <MenuItem 
          icon="bell" 
          title="Notificações" 
          onPress={() => Alert.alert("Aviso", "Tela de notificações em construção!")} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mais</Text>
        
        <MenuItem 
          icon="help-circle" 
          title="Central de Ajuda" 
          onPress={() => Alert.alert("Aviso", "Suporte em construção!")} 
        />
        <MenuItem 
          icon="settings" 
          title="Configurações" 
          onPress={() => Alert.alert("Aviso", "Tela de configurações em construção!")} 
        />
        
        {/* BOTÃO DE SAIR (Passando a propriedade isDestructive como true) */}
        <MenuItem 
          icon="log-out" 
          title="Sair da Conta" 
          onPress={handleLogout} 
          isDestructive={true} 
        />
      </View>

      <Text style={styles.versionText}>Ponto a Ponto App v1.0.0</Text>
      
    </ScrollView>
  );
}
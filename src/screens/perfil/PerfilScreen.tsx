// Arquivo: src/screens/perfil/PerfilScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

// 1. IMPORTAÇÕES DO FIREBASE
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';

// Mini-componente de botão do menu
interface MenuItemProps {
  icon: any; 
  title: string;
  onPress: () => void;
  isDestructive?: boolean; 
}

const MenuItem = ({ icon, title, onPress, isDestructive = false }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Feather name={icon} size={22} color={isDestructive ? '#E63946' : '#A55C45'} />
      <Text style={[styles.menuItemText, isDestructive && { color: '#E63946' }]}>
        {title}
      </Text>
    </View>
    {!isDestructive && <Feather name="chevron-right" size={20} color="#EADCC8" />}
  </TouchableOpacity>
);

export default function PerfilScreen({ navigation }: any) {
  
  // 2. ESTADOS PARA OS DADOS DO BANCO
  const [isAdmin, setIsAdmin] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('Carregando...');
  const [emailUsuario, setEmailUsuario] = useState('');

  // 3. BUSCANDO OS DADOS ASSIM QUE A TELA ABRE
  useEffect(() => {
    const carregarDadosUsuario = async () => {
      // Verifica se tem alguém logado
      if (auth.currentUser) {
        setEmailUsuario(auth.currentUser.email || ''); // Pega o e-mail da sessão
        
        try {
          // Vai lá no Firestore, na coleção 'usuarios', e busca o documento deste usuário
          const userDoc = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));
          
          if (userDoc.exists()) {
            setNomeUsuario(userDoc.data().nome); // Atualiza a tela com o nome real
            
            // Se o campo isAdmin for true, libera o painel do lojista!
            if (userDoc.data().isAdmin) {
              setIsAdmin(true);
            }
          }
        } catch (error) {
          console.log("Erro ao buscar dados do usuário:", error);
          setNomeUsuario("Usuário");
        }
      }
    };

    carregarDadosUsuario();
  }, []);

  // 4. LÓGICA DE LOGOUT REAL NA NUVEM
  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja desconectar do aplicativo?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth); // Desconecta do servidor do Google
              navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            } catch (error) {
              Alert.alert("Erro", "Não foi possível sair da conta.");
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {/* Pega a primeira letra do nome que veio do banco */}
          <Text style={styles.avatarText}>{nomeUsuario.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.userName}>{nomeUsuario}</Text>
        <Text style={styles.userEmail}>{emailUsuario}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minha Conta</Text>
        <MenuItem icon="map-pin" title="Endereços de Entrega" onPress={() => Alert.alert("Aviso", "Em construção!")} />
        <MenuItem icon="credit-card" title="Formas de Pagamento" onPress={() => Alert.alert("Aviso", "Em construção!")} />
        <MenuItem icon="file-text" title="Meus Pedidos" onPress={() => navigation.navigate('PedidosTab')} />
      </View>

      {/* 5. ÁREA EXCLUSIVA DO LOJISTA (Só aparece se isAdmin for true) */}
      {isAdmin && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Painel do Lojista</Text>
          <MenuItem 
            icon="plus-square" 
            title="Cadastrar Novo Produto" 
            onPress={() => navigation.navigate('CadastroProduto')} 
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mais</Text>
        <MenuItem icon="settings" title="Configurações" onPress={() => Alert.alert("Aviso", "Em construção!")} />
        <MenuItem icon="log-out" title="Sair da Conta" onPress={handleLogout} isDestructive={true} />
      </View>

      <Text style={styles.versionText}>Ponto a Ponto App v1.0.0</Text>
      
    </ScrollView>
  );
}

// Os estilos continuam os mesmos que você já tinha no arquivo!
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F1E5' },
  profileHeader: { alignItems: 'center', paddingTop: Constants.statusBarHeight + 30, paddingBottom: 30, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EADCC8' },
  avatarContainer: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#C56A47', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarText: { fontSize: 40, fontWeight: 'bold', color: '#FFF' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  userEmail: { fontSize: 14, color: '#888' },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#A55C45', marginBottom: 10, textTransform: 'uppercase' },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#EADCC8' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { fontSize: 16, color: '#333', marginLeft: 15, fontWeight: '500' },
  versionText: { textAlign: 'center', color: '#A55C45', marginTop: 30, marginBottom: 40, fontSize: 12 }
});
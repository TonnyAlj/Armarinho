// Arquivo: src/screens/perfil/PerfilScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, ActivityIndicator, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../../services/firebaseConfig';

interface MenuItemProps {
  icon: any; title: string; onPress: () => void; isDestructive?: boolean; 
}

const MenuItem = ({ icon, title, onPress, isDestructive = false }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Feather name={icon} size={22} color={isDestructive ? '#E63946' : '#A55C45'} />
      <Text style={[styles.menuItemText, isDestructive && { color: '#E63946' }]}>{title}</Text>
    </View>
    {!isDestructive && <Feather name="chevron-right" size={20} color="#EADCC8" />}
  </TouchableOpacity>
);

export default function PerfilScreen({ navigation }: any) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('Carregando...');
  const [emailUsuario, setEmailUsuario] = useState('');
  
  // NOVO: Estados para a foto de perfil
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  
  const [telefone, setTelefone] = useState('Não informado');
  const [endereco, setEndereco] = useState({ rua: '', numero: '', complemento: '', cidade: '', estado: '', cep: '' });

  const [modalVisivel, setModalVisivel] = useState(false);
  const [salvando, setSalvando] = useState(false);
  
  const [editTelefone, setEditTelefone] = useState('');
  const [editRua, setEditRua] = useState('');
  const [editNumero, setEditNumero] = useState('');
  const [editComplemento, setEditComplemento] = useState('');
  const [editCidade, setEditCidade] = useState('');
  const [editEstado, setEditEstado] = useState('');
  const [editCep, setEditCep] = useState('');

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  const carregarDadosUsuario = async () => {
    if (auth.currentUser) {
      setEmailUsuario(auth.currentUser.email || '');
      try {
        const userDoc = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));
        if (userDoc.exists()) {
          const dados = userDoc.data();
          setNomeUsuario(dados.nome || 'Usuário');
          
          if (dados.avatarUrl) setAvatarUrl(dados.avatarUrl); // Carrega a foto do banco, se existir
          if (dados.telefone) setTelefone(dados.telefone);
          if (dados.endereco) {
            setEndereco({
              rua: dados.endereco.rua || '', numero: dados.endereco.numero || '', complemento: dados.endereco.complemento || '',
              cidade: dados.endereco.cidade || '', estado: dados.endereco.estado || '', cep: dados.endereco.cep || ''
            });
          }
          if (dados.isAdmin) setIsAdmin(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // LÓGICA DE UPLOAD DA FOTO DE PERFIL
  const handleTrocarFotoPerfil = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissao.status !== 'granted') {
      Alert.alert("Aviso", "Precisamos de acesso à galeria para alterar sua foto.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1], // Força um corte quadrado para ficar perfeito no círculo
      quality: 0.5,
      base64: true,
    });

    if (!resultado.canceled && resultado.assets[0].base64 && auth.currentUser) {
      setUploadingAvatar(true);
      try {
        const IMGBB_API_KEY = process.env.EXPO_PUBLIC_IMGBB_API_KEY; 
        const formData = new FormData();
        formData.append('image', resultado.assets[0].base64);

        const respostaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: 'POST',
          body: formData,
        });
        
        const dadosImgbb = await respostaImgbb.json();
        
        if (!dadosImgbb.success) {
          throw new Error("Falha no upload da imagem.");
        }
        
        const urlFinal = dadosImgbb.data.url;

        // Atualiza a foto no Firestore
        await updateDoc(doc(db, 'usuarios', auth.currentUser.uid), {
          avatarUrl: urlFinal
        });

        // Atualiza a foto na tela imediatamente
        setAvatarUrl(urlFinal);
        Alert.alert("Sucesso", "Sua foto de perfil foi atualizada!");

      } catch (error) {
        Alert.alert("Erro", "Não foi possível enviar a foto.");
      } finally {
        setUploadingAvatar(false);
      }
    }
  };

  const abrirModalEdicao = () => {
    setEditTelefone(telefone !== 'Não informado' ? telefone : '');
    setEditRua(endereco.rua); setEditNumero(endereco.numero); setEditComplemento(endereco.complemento);
    setEditCidade(endereco.cidade); setEditEstado(endereco.estado); setEditCep(endereco.cep);
    setModalVisivel(true);
  };

  const handleSalvarDados = async () => {
    if (!auth.currentUser) return;
    setSalvando(true);
    try {
      const novosDadosEndereco = {
        rua: editRua.trim(), numero: editNumero.trim(), complemento: editComplemento.trim(),
        cidade: editCidade.trim(), estado: editEstado.trim().toUpperCase(), cep: editCep.trim()
      };
      await updateDoc(doc(db, 'usuarios', auth.currentUser.uid), {
        telefone: editTelefone.trim(), endereco: novosDadosEndereco
      });
      setTelefone(editTelefone.trim() || 'Não informado');
      setEndereco(novosDadosEndereco);
      Alert.alert("Sucesso", "Seus dados foram atualizados!");
      setModalVisivel(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    } finally {
      setSalvando(false);
    }
  };

  const handleRedefinirSenha = () => {
    Alert.alert("Redefinir Senha", `Deseja receber um link de recuperação no e-mail ${emailUsuario}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Sim, enviar", onPress: async () => {
          try {
            await sendPasswordResetEmail(auth, emailUsuario);
            Alert.alert("E-mail Enviado!", "Verifique sua caixa de entrada para alterar a senha.");
          } catch (error) {
            Alert.alert("Erro", "Não foi possível enviar o e-mail.");
          }
        } 
      }
    ]);
  };

  const handleLogout = () => {
    Alert.alert("Sair da Conta", "Tem certeza que deseja desconectar?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: async () => {
            try { await signOut(auth); navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); } 
            catch (error) { Alert.alert("Erro", "Não foi possível sair."); }
          }
        }
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          
          {/* ÁREA DA FOTO DE PERFIL COM BOTÃO DE EDIÇÃO */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarContainer}>
              {uploadingAvatar ? (
                <ActivityIndicator color="#FFF" size="large" />
              ) : avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>{nomeUsuario.charAt(0).toUpperCase()}</Text>
              )}
            </View>
            
            <TouchableOpacity style={styles.editAvatarBadge} onPress={handleTrocarFotoPerfil} disabled={uploadingAvatar}>
              <Feather name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{nomeUsuario}</Text>
          <Text style={styles.userEmail}>{emailUsuario}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>Meus Dados de Contato</Text>
            <TouchableOpacity onPress={abrirModalEdicao}>
              <Feather name="edit" size={18} color="#4A90E2" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.infoRow}>
            <Feather name="phone" size={18} color="#A55C45" />
            <Text style={styles.infoText}>{telefone}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Feather name="map-pin" size={18} color="#A55C45" style={{ marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              {endereco.rua ? (
                <>
                  <Text style={styles.infoText}>{endereco.rua}, {endereco.numero}</Text>
                  {endereco.complemento ? <Text style={styles.infoSubText}>{endereco.complemento}</Text> : null}
                  <Text style={styles.infoSubText}>{endereco.cidade} - {endereco.estado} | CEP: {endereco.cep}</Text>
                </>
              ) : (
                <Text style={styles.infoText}>Endereço não cadastrado</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minha Conta</Text>
          <MenuItem icon="package" title="Meus Pedidos" onPress={() => navigation.navigate('PedidosTab')} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          <MenuItem icon="bell" title="Notificações" onPress={() => Alert.alert("Notificações", "Gerenciamento de alertas disponível na próxima versão.")} />
          <MenuItem icon="lock" title="Privacidade e Senha" onPress={handleRedefinirSenha} />
          <MenuItem icon="help-circle" title="Central de Ajuda" onPress={() => Alert.alert("Suporte", "Precisa de ajuda? Entre em contato:\nsuporte@pontoaponto.com")} />
        </View>

        {isAdmin && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Painel do Lojista</Text>
            
            <MenuItem 
              icon="truck" 
              title="Gerenciar Pedidos dos Clientes" 
              onPress={() => {
              navigation.getParent()?.navigate('GerenciarPedidos');
              }} 
            />
            
            <MenuItem icon="list" title="Gerenciar Vitrine (Editar/Excluir)" onPress={() => navigation.navigate('GerenciarProdutos')} />
            <MenuItem icon="plus-square" title="Cadastrar Novo Produto" onPress={() => navigation.navigate('CadastroProduto')} />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mais</Text>
          <MenuItem icon="log-out" title="Sair da Conta" onPress={handleLogout} isDestructive={true} />
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={modalVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Dados</Text>
              <TouchableOpacity onPress={() => setModalVisivel(false)}>
                <Feather name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Telefone</Text>
              <TextInput style={styles.input} value={editTelefone} onChangeText={setEditTelefone} keyboardType="phone-pad" placeholder="(00) 00000-0000" />
              <Text style={styles.label}>CEP</Text>
              <TextInput style={styles.input} value={editCep} onChangeText={setEditCep} keyboardType="numeric" placeholder="00000-000" />
              <Text style={styles.label}>Rua / Avenida</Text>
              <TextInput style={styles.input} value={editRua} onChangeText={setEditRua} placeholder="Ex: Rua das Flores" />
              <View style={styles.row}>
                <View style={styles.halfInput}>
                  <Text style={styles.label}>Número</Text>
                  <TextInput style={styles.input} value={editNumero} onChangeText={setEditNumero} placeholder="Ex: 123" />
                </View>
                <View style={styles.halfInput}>
                  <Text style={styles.label}>Complemento</Text>
                  <TextInput style={styles.input} value={editComplemento} onChangeText={setEditComplemento} placeholder="Apto 42" />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.halfInput}>
                  <Text style={styles.label}>Cidade</Text>
                  <TextInput style={styles.input} value={editCidade} onChangeText={setEditCidade} placeholder="Sua cidade" />
                </View>
                <View style={styles.halfInput}>
                  <Text style={styles.label}>Estado (UF)</Text>
                  <TextInput style={styles.input} value={editEstado} onChangeText={setEditEstado} placeholder="PR" maxLength={2} autoCapitalize="characters" />
                </View>
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSalvarDados} disabled={salvando}>
                {salvando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.saveButtonText}>SALVAR ALTERAÇÕES</Text>}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F1E5' },
  profileHeader: { alignItems: 'center', paddingTop: Constants.statusBarHeight + 30, paddingBottom: 30, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EADCC8' },
  
  // ESTILOS DA FOTO DE PERFIL
  avatarWrapper: { position: 'relative', marginBottom: 15 },
  avatarContainer: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#C56A47', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  avatarText: { fontSize: 40, fontWeight: 'bold', color: '#FFF' },
  editAvatarBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#4A90E2', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
  
  userName: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  userEmail: { fontSize: 14, color: '#888' },
  infoCard: { backgroundColor: '#FFF', marginHorizontal: 20, marginTop: -20, borderRadius: 12, padding: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, borderWidth: 1, borderColor: '#EADCC8' },
  infoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: '#C56A47', textTransform: 'uppercase' },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  infoText: { fontSize: 16, color: '#333', marginLeft: 10 },
  infoSubText: { fontSize: 14, color: '#888', marginLeft: 10, marginTop: 2 },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#A55C45', marginBottom: 10, textTransform: 'uppercase' },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#EADCC8' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { fontSize: 16, color: '#333', marginLeft: 15, fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  label: { fontSize: 14, color: '#A55C45', fontWeight: 'bold', marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#F7F1E5', borderWidth: 1, borderColor: '#EADCC8', borderRadius: 8, padding: 12, fontSize: 16, color: '#333' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  saveButton: { backgroundColor: '#34C759', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 25, marginBottom: 20 },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});
// Arquivo: App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; // Nossos ícones para o menu

// Importando as telas da Pilha
import LoginScreen from './src/screens/login/LoginScreen';
import CadastroScreen from './src/screens/cadastro/CadastroScreen';

// Importando as telas das Abas
import HomeScreen from './src/screens/home/HomeScreen';
import BuscaScreen from './src/screens/busca/BuscaScreen';
import CarrinhoScreen from './src/screens/carrinho/CarrinhoScreen';
import PedidosScreen from './src/screens/pedidos/PedidosScreen';
import PerfilScreen from './src/screens/perfil/PerfilScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 1. Criamos um "Módulo de Abas" separado
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Esconde o cabeçalho padrão de todas as telas
        tabBarActiveTintColor: '#C56A47', // Cor do ícone selecionado (Terracota)
        tabBarInactiveTintColor: '#A55C45', // Cor do ícone inativo
        tabBarStyle: { backgroundColor: '#F7F1E5', borderTopColor: '#EADCC8' }, // Cor de fundo do menu
        
        // Essa função escolhe o ícone certo dependendo do nome da tela
        tabBarIcon: ({ color, size }) => {
          let iconName: any = 'home';

          if (route.name === 'HomeTab') iconName = 'home';
          else if (route.name === 'BuscaTab') iconName = 'search';
          else if (route.name === 'CarrinhoTab') iconName = 'shopping-cart';
          else if (route.name === 'PedidosTab') iconName = 'file-text';
          else if (route.name === 'PerfilTab') iconName = 'user';

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Nomes das rotas no menu (terminam com Tab para não confundir com a pilha) */}
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="BuscaTab" component={BuscaScreen} options={{ tabBarLabel: 'Busca' }} />
      <Tab.Screen name="CarrinhoTab" component={CarrinhoScreen} options={{ tabBarLabel: 'Carrinho' }} />
      <Tab.Screen name="PedidosTab" component={PedidosScreen} options={{ tabBarLabel: 'Pedidos' }} />
      <Tab.Screen name="PerfilTab" component={PerfilScreen} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
}

// 2. A nossa Pilha principal continua igual, mas agora a "Home" é o nosso Módulo de Abas!
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ 
            title: 'Voltar',
            headerStyle: { backgroundColor: '#F7F1E5' },
            headerTintColor: '#A55C45',
            headerShadowVisible: false,
          }} 
        />
        
        {/* A MÁGICA ACONTECE AQUI: Quando fazemos login, vamos para o MainTabs */}
        <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
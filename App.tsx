import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import LoginScreen from './src/screens/login/LoginScreen';
import CadastroScreen from './src/screens/cadastro/CadastroScreen';
import DetalhesProdutoScreen from './src/screens/detalhes/DetalhesProdutoScreen';
import CadastroProdutoScreen from './src/screens/admin/CadastroProdutoScreen';
import GerenciarProdutosScreen from './src/screens/admin/GerenciarProdutosScreen'; // <-- Tela Nova

import HomeScreen from './src/screens/home/HomeScreen';
import BuscaScreen from './src/screens/busca/BuscaScreen';
import CarrinhoScreen from './src/screens/carrinho/CarrinhoScreen';
import PedidosScreen from './src/screens/pedidos/PedidosScreen';
import PerfilScreen from './src/screens/perfil/PerfilScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarActiveTintColor: '#C56A47', 
        tabBarInactiveTintColor: '#A55C45', 
        tabBarStyle: { backgroundColor: '#F7F1E5', borderTopColor: '#EADCC8' },
        
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
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="BuscaTab" component={BuscaScreen} options={{ tabBarLabel: 'Busca' }} />
      <Tab.Screen name="CarrinhoTab" component={CarrinhoScreen} options={{ tabBarLabel: 'Carrinho' }} />
      <Tab.Screen name="PedidosTab" component={PedidosScreen} options={{ tabBarLabel: 'Pedidos' }} />
      <Tab.Screen name="PerfilTab" component={PerfilScreen} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen 
            name="Cadastro" 
            component={CadastroScreen} 
            options={{ title: 'Voltar', headerStyle: { backgroundColor: '#F7F1E5' }, headerTintColor: '#A55C45', headerShadowVisible: false }} 
          />
          <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="DetalhesProduto" component={DetalhesProdutoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CadastroProduto" component={CadastroProdutoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GerenciarProdutos" component={GerenciarProdutosScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
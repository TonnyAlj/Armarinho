// Arquivo: App.tsx na raiz do projeto
import { StatusBar } from 'expo-status-bar';

// Aqui estamos importando a tela que acabamos de criar!
import LoginScreen from './src/screens/LoginScreen'; 

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      {/* Chamando o componente da tela de login */}
      <LoginScreen /> 
    </>
  );
}
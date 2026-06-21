// Arquivo: src/services/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
// Importamos o Firestore (Banco de Dados) e o Auth (Autenticação de Usuários)
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// SUBSTITUA as informações abaixo pelas chaves do SEU console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDWZZHhfrbeStYkFd2z5WhsHZwmGsKZgX4",
  authDomain: "ponto-a-ponto-app.firebaseapp.com",
  projectId: "ponto-a-ponto-app",
  storageBucket: "ponto-a-ponto-app.appspot.com",
  messagingSenderId: "734872992742",
  appId: "1:734872992742:web:faceac8b4a86ee61e5f427",
  measurementId: "G-F3B5GXC35Z"
};

// 1. Inicializa o aplicativo Firebase com as suas credenciais
const app = initializeApp(firebaseConfig);

// 2. Exporta o banco de dados e a autenticação para usarmos nas outras telas
export const db = getFirestore(app);
export const auth = getAuth(app);
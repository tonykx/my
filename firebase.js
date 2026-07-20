// Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Configuração do seu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA7b0-N-I756FSgiO2SkW2hgQQlxMcX2uk",
  authDomain: "diasdeliberdade.firebaseapp.com",
  projectId: "diasdeliberdade",
  storageBucket: "diasdeliberdade.firebasestorage.app",
  messagingSenderId: "762530351382",
  appId: "1:762530351382:web:e0f91bd1f18e8eda30e837",
  measurementId: "G-T496ZW41J1"
};

// Inicializa
const app = initializeApp(firebaseConfig);

// Auth
const auth = getAuth(app);

// Firestore
const db = getFirestore(app);

// Google
const provider = new GoogleAuthProvider();

// Deixa tudo disponível para o app.js
window.auth = auth;
window.db = db;
window.provider = provider;
window.signInWithPopup = signInWithPopup;
window.signOut = signOut;
window.onAuthStateChanged = onAuthStateChanged;
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7b0-N-I756FSgiO2SkW2hgQQlxMcX2uk",
  authDomain: "diasdeliberdade.firebaseapp.com",
  projectId: "diasdeliberdade",
  storageBucket: "diasdeliberdade.firebasestorage.app",
  messagingSenderId: "762530351382",
  appId: "1:762530351382:web:e0f91bd1f18e8eda30e837",
  measurementId: "G-T496ZW41J1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
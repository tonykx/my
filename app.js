import { auth, db, provider } from "./firebase.js";

import {
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const loginDiv = document.getElementById("login");
const appDiv = document.getElementById("app");

const btnLogin = document.getElementById("loginGoogle");
const btnSair = document.getElementById("sair");
const btnRecai = document.getElementById("recai");

const nome = document.getElementById("nome");
const foto = document.getElementById("foto");
const titulo = document.getElementById("titulo");
const contador = document.getElementById("contador");

let usuario = null;
let timer = null;

// Verifica se o script carregou
alert("app.js carregado!");

try {
  await getRedirectResult(auth);
} catch (e) {
  alert("Erro no login: " + e.message);
  console.error(e);
}

btnLogin.addEventListener("click", async () => {
  alert("Botão funcionando!");

  try {
    await signInWithRedirect(auth, provider);
  } catch (e) {
    alert("Erro: " + e.message);
    console.error(e);
  }
});

btnSair.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    loginDiv.style.display = "block";
    appDiv.style.display = "none";
    return;
  }

  usuario = user;

  loginDiv.style.display = "none";
  appDiv.style.display = "block";

  nome.textContent = user.displayName || "";
  foto.src = user.photoURL || "";

  const ref = doc(db, "usuarios", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const vicio = prompt("Qual vício deseja vencer?") || "Sem definição";

    await setDoc(ref, {
      vicio,
      inicio: Date.now()
    });
  }

  carregar();
});

async function carregar() {
  const ref = doc(db, "usuarios", usuario.uid);
  const snap = await getDoc(ref);

  const dados = snap.data();

  titulo.textContent = "Livre de: " + dados.vicio;

  atualizar(dados.inicio);

  clearInterval(timer);

  timer = setInterval(() => {
    atualizar(dados.inicio);
  }, 1000);
}

function atualizar(inicio) {
  const tempo = Date.now() - inicio;

  const dias = Math.floor(tempo / 86400000);
  const horas = Math.floor(tempo / 3600000) % 24;
  const minutos = Math.floor(tempo / 60000) % 60;
  const segundos = Math.floor(tempo / 1000) % 60;

  contador.textContent =
    `${dias} dias ${horas}h ${minutos}m ${segundos}s`;
}

btnRecai.addEventListener("click", async () => {
  if (!confirm("Deseja reiniciar o contador?")) return;

  await updateDoc(doc(db, "usuarios", usuario.uid), {
    inicio: Date.now()
  });

  carregar();
});
async function carregarDados() {
  const resposta = await fetch("data.json");
  const dados = await resposta.json();

  return dados;
}

async function atualizarContador() {
  const dataInicio = new Date("2025-06-16T00:00:00");
  const agora = new Date();
  let diff = agora - dataInicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= (1000 * 60 * 60 * 24);

  const horas = Math.floor(diff / (1000 * 60 * 60));
  diff %= (1000 * 60 * 60);

  const minutos = Math.floor(diff / (1000 * 60));
  diff %= (1000 * 60);

  const segundos = Math.floor(diff / 1000);

  document.getElementById("contador").textContent =
    `${dias} dia${dias !== 1 ? 's' : ''}, ` +
    `${horas} hora${horas !== 1 ? 's' : ''}, ` +
    `${minutos} minuto${minutos !== 1 ? 's' : ''} e ` +
    `${segundos} segundo${segundos !== 1 ? 's' : ''}`;

  const dados = await carregarDados();

  // Atualizar mensagem de motivação
  document.getElementById("mensagem").textContent = 
    dados.mensagens[dias % dados.mensagens.length];

  // Verificar conquistas desbloqueadas
  const conquistaAtual = dados.conquistas.find(c => c.dias === dias);
  document.getElementById("conquista").textContent = conquistaAtual ? conquistaAtual.texto : "Nenhuma conquista desbloqueada ainda.";
}

async function mostrarVersiculo() {
  const dados = await carregarDados();
  const index = Math.floor(Math.random() * dados.versiculos.length);
  document.getElementById("versiculo").textContent = dados.versiculos[index];
}

function alternarTema() {
  document.body.classList.toggle("claro");
}

// Atualizações automáticas
setInterval(atualizarContador, 1000);
setInterval(mostrarVersiculo, 30000);
atualizarContador();
mostrarVersiculo();
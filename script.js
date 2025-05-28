
let botCommands; 

const categoryButtonsDiv = document.getElementById("category-buttons");
const commandsContainerDiv = document.getElementById("commands-container");

function generateContent(data) {
  botCommands = data;

  for (const category in botCommands) {
    const categoryBtn = document.createElement("button");
    const categorySlug = category.replace(/\s+/g, '-').toLowerCase();
    categoryBtn.className = "category-btn";
    categoryBtn.textContent = category;
    categoryBtn.onclick = () => showCommands(categorySlug);
    categoryButtonsDiv.appendChild(categoryBtn);

    const section = document.createElement("div");
    section.className = "commands-section";
    section.id = `${categorySlug}-commands`;

    const title = document.createElement("h2");
    title.textContent = `Comandos de ${category}`;
    section.appendChild(title);

    const list = document.createElement("ul");
    list.className = "commands-list";

    botCommands[category].forEach(cmd => {
      const card = document.createElement("li");
      card.className = "command-card";
      card.innerHTML = `
        <div class="command-icon"><i class="${cmd.icon}"></i></div>
        <div class="command-name">${cmd.name}</div>
        <div class="command-description">${cmd.description}</div>
        ${cmd.usage ? `<div class="command-usage">Uso: ${cmd.usage}</div>` : ''}
      `;
      list.appendChild(card);
    });

    section.appendChild(list);

    const back = document.createElement("button");
    back.className = "back-btn";
    back.textContent = "Voltar";
    back.onclick = backToCategories;
    section.appendChild(back);

    commandsContainerDiv.appendChild(section);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('commands.json')
    .then(r => r.json())
    .then(generateContent)
    .catch(e => {
      console.error("Erro ao carregar comandos:", e);
      commandsContainerDiv.innerHTML = "<p>Erro ao carregar comandos.</p>";
    });
});

function showCommands(slug) {
  document.getElementById("category-buttons").style.display = "none";
  document.querySelectorAll(".commands-section").forEach(el => el.style.display = "none");
  const section = document.getElementById(`${slug}-commands`);
  if (section) section.style.display = "block";
  history.pushState({ page: slug }, "", `#${slug}`);
}

function backToCategories() {
  document.getElementById("category-buttons").style.display = "flex";
  document.querySelectorAll(".commands-section").forEach(el => el.style.display = "none");
}

// Intercepta o botão "voltar" do celular/navegador
window.addEventListener("popstate", function () {
  backToCategories();
});

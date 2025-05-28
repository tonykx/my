
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
    categoryBtn.setAttribute("onclick", `showCommands('${categorySlug}')`);
    categoryButtonsDiv.appendChild(categoryBtn);

    const commandsSection = document.createElement("div");
    commandsSection.className = "commands-section";
    commandsSection.id = `${categorySlug}-commands`;

    const title = document.createElement("h2");
    title.textContent = `Comandos de ${category}`;
    commandsSection.appendChild(title);

    const ul = document.createElement("ul");
    botCommands[category].forEach(command => {
      const li = document.createElement("li");
      li.innerHTML = `
        <i class="${command.icon} command-icon"></i>
        <div>
          <span class="command-name">${command.name}</span>
          <p class="command-description">${command.description}</p>
          ${command.usage ? `<p class="command-usage">Uso: ${command.usage}</p>` : ''}
        </div>
      `;
      ul.appendChild(li);
    });
    commandsSection.appendChild(ul);

    const backBtn = document.createElement("button");
    backBtn.className = "back-btn";
    backBtn.textContent = "Voltar";
    backBtn.setAttribute("onclick", "backToCategories()");
    commandsSection.appendChild(backBtn);

    commandsContainerDiv.appendChild(commandsSection);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('commands.json')
    .then(response => response.json())
    .then(data => generateContent(data))
    .catch(error => {
      commandsContainerDiv.innerHTML = "<p>Erro ao carregar comandos.</p>";
      console.error(error);
    });
});

function showCommands(type) {
  document.getElementById("category-buttons").style.display = "none";
  document.querySelectorAll(".commands-section").forEach(div => div.style.display = "none");
  const commandsDiv = document.getElementById(`${type}-commands`);
  if (commandsDiv) commandsDiv.style.display = "block";
}

function backToCategories() {
  document.getElementById("category-buttons").style.display = "block";
  document.querySelectorAll(".commands-section").forEach(div => div.style.display = "none");
}

const clockContainer = document.getElementById('clock-container');
const clockTimeElement = document.getElementById('clock-time');
const background = document.getElementById('background');
const buttons = document.querySelectorAll('.timezone-buttons button');
const pet = document.getElementById('pet');
let currentTimeZone = 'America/Sao_Paulo'; // Fuso horário padrão
let currentCityClass = 'brasilia'; // Classe inicial

const areaRadius = 150; // Área sensível ao redor do relógio

// Atualiza o relógio digital com base no fuso horário
function updateClock() {
  const now = new Date();
  const options = { timeZone: currentTimeZone, hour12: false };
  const timeString = now.toLocaleTimeString('en-US', options);
  clockTimeElement.textContent = timeString;
}

// Adiciona evento de clique nos botões
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    currentTimeZone = button.dataset.timezone; // Atualiza o fuso horário com base no botão clicado
    currentCityClass = button.dataset.color; // Atualiza a classe para a cidade

    // Atualiza o fundo com a imagem associada ao botão
    const bgImage = button.dataset.bg;
    background.style.backgroundImage = `url('${bgImage}')`;

    // Aplica o efeito Big Bang
    clockContainer.classList.add('bigbang');

    // Remove a classe após a animação
    setTimeout(() => {
      clockContainer.classList.remove('bigbang');
      updateClock(); // Atualiza o relógio após o efeito
    }, 800); // Duração da animação
  });
});

// Verifica a posição do mouse e altera a cor do relógio
document.addEventListener('mousemove', (event) => {
  const rect = clockContainer.getBoundingClientRect();
  const clockCenterX = rect.left + rect.width / 2;
  const clockCenterY = rect.top + rect.height / 2;

  // Calcula a distância entre o mouse e o centro do relógio
  const distance = Math.sqrt(
    Math.pow(event.clientX - clockCenterX, 2) +
    Math.pow(event.clientY - clockCenterY, 2)
  );

  // Adiciona ou remove a classe 'active' com base na distância
  if (distance <= areaRadius) {
    clockContainer.classList.add('active', currentCityClass);
  } else {
    clockContainer.classList.remove('active', currentCityClass);
  }
});

// Efeito de pulo no pet ao clicar
pet.addEventListener('click', () => {
  pet.classList.add('jump');
  setTimeout(() => {
    pet.classList.remove('jump');
  }, 300); // Duração do pulo
});

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);
updateClock(); // Atualização inicial para evitar atraso

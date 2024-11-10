// Objeto para armazenar o status do Tamagotchi
const tamagotchi = {
    fome: 50,
    diversao: 50,
    energia: 50
};

// Função para carregar o estado do Tamagotchi do localStorage
function loadTamagotchi() {
    const savedData = localStorage.getItem("tamagotchi");
    if (savedData) {
        Object.assign(tamagotchi, JSON.parse(savedData));
    }
    updateDisplay();
}

// Função para salvar o estado no localStorage
function saveTamagotchi() {
    localStorage.setItem("tamagotchi", JSON.stringify(tamagotchi));
}

// Função para atualizar a exibição
function updateDisplay() {
    document.getElementById("hunger").textContent = `Fome: ${tamagotchi.fome}`;
    document.getElementById("fun").textContent = `Diversão: ${tamagotchi.diversao}`;
    document.getElementById("energy").textContent = `Energia: ${tamagotchi.energia}`;
}

// Função de animação para o Tamagotchi
function animateTamagotchi(animation) {
    const tamagotchiElement = document.getElementById("tamagotchi");
    tamagotchiElement.style.animation = `${animation} 0.5s ease-out`;
    // Remove a animação para que possa ser reaplicada
    setTimeout(() => tamagotchiElement.style.animation = "idle 1s infinite alternate", 500);
}

// Funções de interação
function feed() {
    tamagotchi.fome = Math.min(tamagotchi.fome + 20, 100);
    animateTamagotchi("happy");
    updateDisplay();
    saveTamagotchi();
}

function play() {
    tamagotchi.diversao = Math.min(tamagotchi.diversao + 20, 100);
    animateTamagotchi("play");
    updateDisplay();
    saveTamagotchi();
}

function sleep() {
    tamagotchi.energia = Math.min(tamagotchi.energia + 20, 100);
    animateTamagotchi("sleep");
    updateDisplay();
    saveTamagotchi();
}

// Função para reduzir os status ao longo do tempo
function decreaseStats() {
    tamagotchi.fome = Math.max(tamagotchi.fome - 1, 0);
    tamagotchi.diversao = Math.max(tamagotchi.diversao - 1, 0);
    tamagotchi.energia = Math.max(tamagotchi.energia - 1, 0);
    updateDisplay();
    saveTamagotchi();
}

// Inicialização
loadTamagotchi();
setInterval(decreaseStats, 5000);  // Reduz os status a cada 5 segundos

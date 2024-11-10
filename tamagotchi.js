// Objeto para armazenar o status do Tamagotchi
const tamagotchi = {
    fome: 50,
    diversao: 50,
    energia: 50
};

// Limites para enviar notificações de status crítico
const LIMITES = {
    fome: 20,
    diversao: 20,
    energia: 20
};

// Controle de notificação (para evitar repetição)
let notificouFome = false;
let notificouDiversao = false;
let notificouEnergia = false;

// Função para pedir permissão para notificações com alerta
function solicitarPermissaoNotificacoes() {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        alert("Para uma melhor experiência, permita notificações para ser avisado quando o Tamagotchi precisar de atenção.");
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Permissão para notificações concedida.");
            } else {
                console.log("Permissão para notificações negada.");
            }
        });
    }
}



// Função para enviar notificações
function enviarNotificacao(mensagem) {
    if (Notification.permission === 'granted') {
        new Notification("Atenção!", { body: mensagem });
    }
}

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

// Função para animação de pulo
function animateJump() {
    const tamagotchiElement = document.getElementById("tamagotchi");
    tamagotchiElement.style.animation = 'jump 0.5s';
    tamagotchiElement.addEventListener('animationend', () => {
        tamagotchiElement.style.animation = '';
    });
}

// Funções de interação
function feed() {
    tamagotchi.fome = Math.min(tamagotchi.fome + 20, 100);
    notificouFome = false; // Resetar notificação de fome
    updateDisplay();
    saveTamagotchi();
    animateJump();
}

function play() {
    tamagotchi.diversao = Math.min(tamagotchi.diversao + 20, 100);
    notificouDiversao = false; // Resetar notificação de diversão
    updateDisplay();
    saveTamagotchi();
    animateJump();
}

function sleep() {
    tamagotchi.energia = Math.min(tamagotchi.energia + 20, 100);
    notificouEnergia = false; // Resetar notificação de energia
    updateDisplay();
    saveTamagotchi();
    animateJump();
}

// Função para reduzir os status ao longo do tempo e verificar notificações
function decreaseStats() {
    tamagotchi.fome = Math.max(tamagotchi.fome - 1, 0);
    tamagotchi.diversao = Math.max(tamagotchi.diversao - 1, 0);
    tamagotchi.energia = Math.max(tamagotchi.energia - 1, 0);
    
    // Verificar e enviar notificações de status crítico
    if (tamagotchi.fome <= LIMITES.fome && !notificouFome) {
        enviarNotificacao("Seu Tamagotchi está com muita fome!");
        notificouFome = true;
    }
    if (tamagotchi.diversao <= LIMITES.diversao && !notificouDiversao) {
        enviarNotificacao("Seu Tamagotchi está entediado!");
        notificouDiversao = true;
    }
    if (tamagotchi.energia <= LIMITES.energia && !notificouEnergia) {
        enviarNotificacao("Seu Tamagotchi está muito cansado!");
        notificouEnergia = true;
    }

    updateDisplay();
    saveTamagotchi();
}

// Inicialização
solicitarPermissaoNotificacoes(); // Solicitar permissão para notificações com alerta
loadTamagotchi();
setInterval(decreaseStats, 5000);  // Reduz os status a cada 5 segundos

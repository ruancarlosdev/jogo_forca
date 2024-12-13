// Lista de palavras para o jogo
const palavras = ["javascript", "html", "css", "forca", "programacao", "desenvolvimento"];
let palavraEscolhida = "";
let palavraExibida = "";
let tentativas = 6;
let letrasErradas = [];
let letrasCorretas = [];

// Função para escolher a palavra aleatória
function escolherPalavra() {
    const indice = Math.floor(Math.random() * palavras.length);
    palavraEscolhida = palavras[indice];
    palavraExibida = "_".repeat(palavraEscolhida.length);
    letrasErradas = [];
    letrasCorretas = [];
    tentativas = 6;
    document.getElementById("tentativas").textContent = `Tentativas restantes: ${tentativas}`;
    document.getElementById("mensagem").textContent = "";
    desenharForca();
    atualizarPalavra();
}

// Função para desenhar o boneco da forca
function desenharForca() {
    const canvas = document.getElementById("forca");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpar o canvas antes de desenhar
    ctx.strokeStyle = "#000";

    if (tentativas <= 5) { // Cabeça
        ctx.beginPath();
        ctx.arc(100, 50, 20, 0, Math.PI * 2, true);
        ctx.stroke();
    }
    if (tentativas <= 4) { // Corpo
        ctx.beginPath();
        ctx.moveTo(100, 70);
        ctx.lineTo(100, 120);
        ctx.stroke();
    }
    if (tentativas <= 3) { // Braço esquerdo
        ctx.beginPath();
        ctx.moveTo(100, 80);
        ctx.lineTo(60, 100);
        ctx.stroke();
    }
    if (tentativas <= 2) { // Braço direito
        ctx.beginPath();
        ctx.moveTo(100, 80);
        ctx.lineTo(140, 100);
        ctx.stroke();
    }
    if (tentativas <= 1) { // Perna esquerda
        ctx.beginPath();
        ctx.moveTo(100, 120);
        ctx.lineTo(60, 140);
        ctx.stroke();
    }
    if (tentativas <= 0) { // Perna direita
        ctx.beginPath();
        ctx.moveTo(100, 120);
        ctx.lineTo(140, 140);
        ctx.stroke();
    }
}

// Função para atualizar a palavra exibida
function atualizarPalavra() {
    const palavraDiv = document.getElementById("palavra");
    palavraDiv.textContent = palavraExibida.split("").join(" ");
}

// Função para verificar a letra digitada
function verificarLetra() {
    const letra = document.getElementById("letra").value.toLowerCase();
    document.getElementById("letra").value = ""; // Limpa o campo de entrada

    if (letra && !letrasErradas.includes(letra) && !letrasCorretas.includes(letra)) {
        if (palavraEscolhida.includes(letra)) {
            letrasCorretas.push(letra);
            atualizarPalavra();
        } else {
            letrasErradas.push(letra);
            tentativas--;
            document.getElementById("tentativas").textContent = `Tentativas restantes: ${tentativas}`;
            desenharForca();
        }

        if (palavraExibida === palavraEscolhida) {
            document.getElementById("mensagem").textContent = "Você venceu!";
            document.getElementById("mensagem").style.color = "green";
        } else if (tentativas === 0) {
            document.getElementById("mensagem").textContent = `Você perdeu! A palavra era: ${palavraEscolhida}`;
        }
    }
}

// Função para iniciar o jogo
escolherPalavra();

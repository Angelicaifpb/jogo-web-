const areaJogo = document.getElementById("area-jogo");
const spanPontuacao = document.getElementById("pontuacao");
const spanVidas = document.getElementById("vidas");
const mensagem = document.getElementById("mensagem");
const faseTexto = document.getElementById("fase");
const botaoReiniciar = document.getElementById("reiniciar");

let pontuacao = 0;
let vidas = 3;
let velocidade = 1000;
let intervalo;

// Função para criar o alvo
function criarAlvo() {
    const alvo = document.createElement("div");
    alvo.classList.add("alvo");

    const maxX = areaJogo.clientWidth - 50;
    const maxY = areaJogo.clientHeight - 50;

    alvo.style.left = Math.random() * maxX + "px";
    alvo.style.top = Math.random() * maxY + "px";

    alvo.onclick = () => {
        pontuacao++;
        spanPontuacao.textContent = pontuacao;
        alvo.remove();

        // Aumenta a dificuldade a cada 5 pontos
        if (pontuacao % 5 === 0 && velocidade > 400) {
            clearInterval(intervalo);
            velocidade -= 100;
            intervalo = setInterval(criarAlvo, velocidade);
        }

        // Fase 2
        if (pontuacao === 10) {
            faseTexto.textContent = "🔥 FASE 2 🔥";
        }
    };

    areaJogo.appendChild(alvo);

    // Se não clicar no alvo
    setTimeout(() => {
        if (areaJogo.contains(alvo)) {
            alvo.remove();
            perderVida();
        }
    }, 900);
}

// Função para perder vida
function perderVida() {
    vidas--;
    spanVidas.textContent = vidas;

    if (vidas === 1) {
        document.body.style.backgroundColor = "#ffcccc";
    }

    if (vidas === 0) {
        fimDeJogo();
    }
}

// Game Over
function fimDeJogo() {
    clearInterval(intervalo);
    mensagem.textContent = "💀 Game Over!";
    botaoReiniciar.style.display = "inline-block";
}

// Reiniciar jogo
function reiniciarJogo() {
    location.reload();
}

// Inicia o jogo
intervalo = setInterval(criarAlvo, velocidade);

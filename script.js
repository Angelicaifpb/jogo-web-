const area = document.getElementById('area-jogo');
const pontosEl = document.getElementById('pontos');
const vidasEl = document.getElementById('vidas');
const botao = document.getElementById('start');


let pontos = 0;
let vidas = 3;
let velocidade = 1500;
let jogo;


function criarBolinha() {
const bolinha = document.createElement('div');
bolinha.classList.add('bolinha');


const tipo = Math.random() > 0.7 ? 'vermelha' : 'verde';
bolinha.classList.add(tipo);


bolinha.style.top = Math.random() * 360 + 'px';
bolinha.style.left = Math.random() * 560 + 'px';


bolinha.onclick = () => {
if (tipo === 'verde') {
pontos += 10;
} else {
vidas--;
}
atualizarInfo();
bolinha.remove();
};


area.appendChild(bolinha);


setTimeout(() => {
if (area.contains(bolinha)) {
vidas--;
atualizarInfo();
bolinha.remove();
}
}, velocidade);
}


function atualizarInfo() {
pontosEl.textContent = pontos;
vidasEl.textContent = vidas;


if (vidas <= 0) {
clearInterval(jogo);
alert('Game Over! Pontuação: ' + pontos);
}
}


botao.onclick = () => {
pontos = 0;
vidas = 3;
velocidade = 1500;
atualizarInfo();


jogo = setInterval(() => {
criarBolinha();
if (velocidade > 500) velocidade -= 50;
}, velocidade);
};
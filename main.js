const opcaoCorDesafio = document.querySelectorAll(".opcaoCor");
const respostaTela = document.querySelector("#correto");
const corDisplay = document.querySelector("h1");
const button = document.querySelector("button");

let cores = [];
let tentativas = 3; // Defina o número desejado de tentativas

GerarCorAleatória();
cores_atribuidas_rodada();
verificaCor();
atualizarTentativas();

function GerarCorAleatória() {
    for (let i = 0; i < opcaoCorDesafio.length; i++) {
        cores.push(
            `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
            )},${Math.floor(Math.random() * 255)})`
        );
    }
}

function cores_atribuidas_rodada() {
    cores.forEach((cor, index) => {
        opcaoCorDesafio[index].style.background = cor;
        opcaoCorDesafio[index].setAttribute("data-cor", cor);
    });
}

function obterCorAleatoria() {
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    corDisplay.textContent = corAleatoria;
    return corAleatoria;
}

function verificaCor() {
    opcaoCorDesafio.forEach((opcaoCor) => {
        opcaoCor.addEventListener("click", (e) => {
            if (e.target.dataset.cor === corEscolhida) {
                respostaTela.textContent = "Correto!!!";
                pintarBody(corEscolhida);
                encerrarJogoVitoria();
            } else {
                respostaTela.textContent = `Errou!!! Tentativas restantes: ${--tentativas}`;
                e.target.classList.add("hide");
                if (tentativas === 0) {
                    encerrarJogoDerrota();
                }
            }
        });
    });
}

function resetar() {
    tentativas = 3;
    cores = [];
    GerarCorAleatória();
    opcaoCorDesafio.forEach((opcaoCor) => opcaoCor.classList.remove("hide"));
    cores_atribuidas_rodada();
    verificaCor();
    corEscolhida = obterCorAleatoria();
    respostaTela.textContent = "";
    atualizarTentativas();
}

function pintarBody(cor) {
    document.body.style.backgroundColor = cor;
}

function encerrarJogoVitoria() {
    alert(`Parabéns! Você acertou a cor e venceu o jogo! O background agora é da cor escolhida.`);
    resetar();
}

function encerrarJogoDerrota() {
    alert(`Suas tentativas acabaram. Você perdeu! A cor escolhida era: ${corEscolhida}`);
    resetar();
}

function atualizarTentativas() {
    // Adicione aqui o código para atualizar a interface do usuário com o número de tentativas restantes
}

let corEscolhida = obterCorAleatoria();

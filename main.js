const opcaoCorDesafio = document.querySelectorAll(".opcaoCor");
const respostaTela = document.querySelector("#correto");
const corDisplay = document.querySelector("h1");
const button = document.querySelector("button");
const todasCoresVetor = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

// Selecionar 10 cores aleatórias

let cores = [];
let tentativas = 3; // Num Tentativas
let corReset = 'black';
let corEscolhida; // Cor correta

function pintarBody(cor) {
    document.body.style.backgroundColor = cor;
}

GerarCorAleatória();
cores_atribuidas_rodada();
corEscolhida = obterCorAleatoria(); // Inicialize corEscolhida
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
    corEscolhida = obterCorAleatoria();
    respostaTela.textContent = "";
    atualizarTentativas();
    pintarBody(corReset); 
}

function rgbToColorName(rgb) {
    const index = todasCoresVetor.findIndex((cor) => cor === rgb);
    return todasCoresVetor[index];
}

function encerrarJogoVitoria() {
    const corNome = rgbToColorName(corEscolhida);

    alert(`Parabéns! Você acertou a cor e venceu o jogo! O background agora é da cor escolhida: ${corNome}`);
    resetar(corReset);

    pintarBody(corReset); // resetar background para o preto
}

function encerrarJogoDerrota() {
    const corNome = rgbToColorName(corEscolhida);

    alert(`Suas tentativas acabaram. Você perdeu! A cor escolhida era: ${corNome}`);
    resetar(corReset);
}

function atualizarTentativas() {
    // Supondo que você tenha um elemento HTML com o id "tentativasRestantes" para exibir as tentativas restantes
    const tentativasRestantesElement = document.getElementById("tentativasRestantes");

    // Atualizar o conteúdo do elemento com o número de tentativas restantes
    tentativasRestantesElement.textContent = `Tentativas Restantes: ${tentativas}`;
}

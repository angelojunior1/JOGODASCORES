//Selecionar DOM

const opcaoCorDesafio = document.querySelectorAll(".opcaoCor");
const respostaTela = document.querySelector("#correto");
const corDisplay = document.querySelector("h1");
const button = document.querySelector("button");

/*Selecionar uma cor*/

let cores = [];
GerarCorAleatória();
cores_atribuidas_rodada();
verificaCor();
function GerarCorAleatória(){
    for(let i=0; i<opcaoCorDesafio.length; i++){
        cores.push(
            `rgb(${Math.floor(Math.random() *255)}, ${Math.floor(
                Math.random() * 255
                )},${Math.floor(Math.random() * 255)})`
        );
    }
}

function cores_atribuidas_rodada(){
    cores.forEach((cor,index) =>{
        opcaoCorDesafio[index].style.background = cor;
        opcaoCorDesafio[index].setAttribute('data-cor',cor)
    })
}

function obterCorAleatoria(){
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    corDisplay.textContent = corAleatoria;
    return corAleatoria;
}

function verificaCor(){
    opcaoCorDesafio.forEach(opcaoCor =>{
        opcaoCor.addEventListener('click', e =>{
            if(e.target.dataset.cor === corEscolhida){
                respostaTela.textContent = 'Correto!!!'
            }
            else{
                respostaTela.textContent = 'Errou!!!   ';
                e.target.classList.add("hide");
            }
        });
    });
}

let corEscolhida = obterCorAleatoria();

function resetar(){
    cores = [];
    GerarCorAleatória();
    opcaoCorDesafio.forEach((opcaoCor) => cor.classList.remove("hide"));
    cores_atribuidas_rodada();
    verificaCor();
    corEscolhida = obterCorAleatoria()
}


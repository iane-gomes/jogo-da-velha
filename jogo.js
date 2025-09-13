// recupera os elementos do HTML (as 9 casas, a mensagem que exibe o status do jogo, e o botão de reiniciar o jogo)
const casas = document.querySelectorAll(".casa");
const mensagem_status = document.getElementById("mensagem-status");
const botao_reiniciar = document.getElementById("reiniciarButton");

// contém o símbolo X ou O que vai ser jogado na jogada atual
let jogador_da_vez = "X";

// array que vai conter os símbolos X e O já jogados, na ordem
let tabuleiro_preenchido = ["", "", "", "", "", "", "", "", ""];

// indica se o jogo ainda é válido (se já acabou ou não)
let jogo_ativo = true;

// array  contendo as combinações de posições que configuram vitória
const posicoes_vitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6] // diagonais
];

// função que dá o nome do jogador atual de acordo com o símbolo jogado
function numeroJogador() {
    if (jogador_da_vez == "X") {
        return 1;
    }
    else {
        return 2;
    }
}

// para cada uma das 9 casas, roda a função que lida com o click do mouse nela
for (const casa of casas) {
    casa.addEventListener("click", handleCasaClicada);
}

// quando o botão de reiniciar for clicado, roda a função reiniciarJogo
botao_reiniciar.addEventListener("click", reiniciarJogo);

// função com todas as ações consequentes de um click em uma casa
function handleCasaClicada(click) {
    // acessa a div que foi clicada
    const casa_clicada = click.target;

    // axtrai o atributo data-posicao da div clicada e subtrai 1 pra obter o índice correspondente no array
    const indice_click = parseInt(casa_clicada.getAttribute("data-posicao")) - 1;

    /* encerra a função se a casa clicada não estiver mais vazia (impede mais de uma jogada na mesma casa)
        ou se o jogo já tiver acabado */
    if (tabuleiro_preenchido[indice_click] !== "" || jogo_ativo == false) {
        return;
    }

    // se for uma jogada válida, continua
    // coloca o símbolo do jogador atual no tabuleiro e no array que guarda as jogadas
    
    tabuleiro_preenchido[indice_click] = jogador_da_vez;
    casa_clicada.innerText = jogador_da_vez;

    // depois da jogada feita, verificar se alguém ganhou ou se foi empate
    verificarResultado();

    // troca o jogador se o jogo ainda estiver ativo
    if (jogo_ativo) {
        trocarJogador();
    }
}

function verificarResultado() {
    // inicia uma variável indicando se houve vitória, que será mudada pra true caso a vitória seja constatada
    let vitoria = false;

        /* percorre as 7 possibilidades de vitória
            e guarda em a, b, c o que está preenchido no tabuleiro nas 3 posições da condição testada no momento
            pra ver se são 3 símbolos iguais */
    for (const condicao of posicoes_vitoria) {
        const a = tabuleiro_preenchido[condicao[0]];
        const b = tabuleiro_preenchido[condicao[1]];
        const c = tabuleiro_preenchido[condicao[2]];

        // checa se a, b, c são iguais e não estão vazios, ou seja, alguém ganhou
        if (a === b && b === c && a !== "") {
            vitoria = true; // indica que houve vitória
            break; // sai do loop porque não precisa mais testar outras condições
        }
    }

    // mostrar a mensagem de status correspondente de vitória
    if (vitoria) {
        mensagem_status.innerHTML = `<b>O jogador ${numeroJogador()} venceu!!</b>`;
        jogo_ativo = false; // indica que o jogo acabou
        return; // encerra a função
    }

    // se não houve vitória, checar se o tabuleiro está todo cheio (empate)
    let casa_vazia = false;

    // percorre todo o tabuleiro procurando por pelo menos uma casa ainda não preenchida
    for (const casa of tabuleiro_preenchido) {
        if (casa == "") {
            casa_vazia = true;
            break; // não precisa mais rodar o loop
        }
    }

    // o indicador de empate é o oposto do indicador de haver casa não preenchida
    const empate = !casa_vazia;

    // mostrar a mensagem de status correspondente de empate
    if (empate) {
        mensagem_status.innerHTML = "<b>Deu empate!!</b>";
        jogo_ativo = false; // indica que o jogo acabou
    }
}

function trocarJogador() {
    // se o jogo já tiver acabado, não faz nada
    if (jogo_ativo == false) {
        return;
    }

    // troca a próxima jogada
    if (jogador_da_vez == "X") {
        jogador_da_vez = "O";
    }
    else {
        jogador_da_vez = "X";
    }

    // troca a mensagem na tela
    mensagem_status.innerHTML = `<b>Jogador ${numeroJogador()}, é a sua vez!</b>`;
}

function reiniciarJogo() {
    // retorna as variáveis pra condição inicial
    jogo_ativo = true;
    jogador_da_vez = "X";
    tabuleiro_preenchido = ["", "", "", "", "", "", "", "", ""];

    // limpa o tabuleiro
    for (const casa of casas) {
        casa.innerText = "";
    }

    // mostra a mensagem de status inicial
    mensagem_status.innerHTML = "<b>Jogador 1, é a sua vez!</b>";
}

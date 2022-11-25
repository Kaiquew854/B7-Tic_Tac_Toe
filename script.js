//DADOS INICIAIS
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

reset();

//EVENTOS

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

//FUNCOES

function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
};

function reset() {
    warning = '';
    let random = Math.floor(Math.random() * 2);
    random === 0 ? player = 'x' : player = 'o';

    for (let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
};

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
};

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
};

function togglePlayer() {
    player === 'x' ? player = 'o' : player = 'x';
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'O "x" vnceu';
        playing = false;
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu';
    } else if (isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(player) {

    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'c1,b2,a3'
    ];

    for (let w in pos) {
        let pArray = pos[w].split(','); //a1 a2 a3
        let hasWon = pArray.every(option => square[option] === player); //every neste array a1 a2 a3 percorre o square e ve se o player ganhou
        if (hasWon) {
            return true;
        }
    }
    return false;

};

function isFull() {
    for (let i in square) {
        if (square[i] === '') {
            return false;
        }
    }
    return true;
}
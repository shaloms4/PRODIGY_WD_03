const cells = document.querySelectorAll('.cell');
const leftMessage = document.getElementById('left-message');
const rightMessage = document.getElementById('right-message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
    changePlayer();
}

function checkResult() {
    let roundWon = false;
    let winningCombination = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCombination = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        highlightWinningCells(winningCombination);
        setMessage(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        setMessage('Draw!');
        gameActive = false;
        return;
    }
}

function highlightWinningCells(winningCombination) {
    winningCombination.forEach(index => {
        document.querySelector(`.cell[data-index='${index}']`).classList.add('winning-cell');
    });
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function setMessage(message) {
    leftMessage.textContent = message;
    rightMessage.textContent = message;
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    setMessage('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

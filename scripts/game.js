const gameBoard = document.getElementById('game-board');
const gameOverElement = document.getElementById('game-over');
const winnerNameElement = document.getElementById('winner-name');
const activePlayerNameElement = document.getElementById('active-player-name');
const startNewGameButton = document.getElementById('start-new-game');
const playerNameInput = document.getElementById('playername');
const editPlayer1Button = document.getElementById('edit-player-1-btn');
const editPlayer2Button = document.getElementById('edit-player-2-btn');
const cancelConfigButton = document.getElementById('cancel-config-btn');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let player1Name = 'Player 1';
let player2Name = 'Player 2';

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

const handleCellClick = (clickedCell, clickedCellIndex) => {
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('disabled'); // Mark the cell as disabled

    checkForWinner();
};// Add this function to handle player name confirmation
const confirmPlayerName = (event) => {
    event.preventDefault(); // Prevent form submission
    updatePlayerNames(); // Update player names
    document.getElementById('config-overlay').style.display = 'none'; // Hide config modal
};

// Add this event listener for the form submission
document.querySelector('#config-overlay form').addEventListener('submit', confirmPlayerName);

const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        winnerNameElement.textContent = currentPlayer === 'X' ? player1Name : player2Name;
        gameOverElement.style.display = 'block';
        return;
    }

    if (!gameState.includes('')) {
        gameActive = false;
        winnerNameElement.textContent = 'Draw!';
        gameOverElement.style.display = 'block';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    activePlayerNameElement.textContent = currentPlayer === 'X' ? player1Name : player2Name;
};

const resetGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameOverElement.style.display = 'none';
    activePlayerNameElement.textContent = player1Name;

    document.querySelectorAll('#game-board li').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled'); // Ensure cells are reset
    });
};

const updatePlayerNames = () => {
    player1Name = playerNameInput.value || 'Player 1';
    player2Name = player1Name === 'Player 1' ? 'Player 2' : 'Player 1'; // Simple logic to differentiate players
    activePlayerNameElement.textContent = player1Name; // Update active player name
};

startNewGameButton.addEventListener('click', resetGame);
gameBoard.addEventListener('click', (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = Array.from(gameBoard.children).indexOf(clickedCell);

    handleCellClick(clickedCell, clickedCellIndex);
});

// Edit Player 1 Name
editPlayer1Button.addEventListener('click', () => {
    playerNameInput.value = player1Name; // Pre-fill input with current player name
    document.getElementById('config-overlay').style.display = 'block'; // Show config modal
});

// Edit Player 2 Name
editPlayer2Button.addEventListener('click', () => {
    playerNameInput.value = player2Name; // Pre-fill input with current player name
    document.getElementById('config-overlay').style.display = 'block'; // Show config modal
});

// Cancel Configuration
cancelConfigButton.addEventListener('click', () => {
    document.getElementById('config-overlay').style.display = 'none'; // Hide config modal
});

//
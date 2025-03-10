document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const restartBtn = document.getElementById('restart');
    const playAgainBtn = document.getElementById('play-again');
    const movesDisplay = document.getElementById('moves');
    const timerDisplay = document.getElementById('timer');
    const winMessage = document.getElementById('win-message');
    const finalMovesDisplay = document.getElementById('final-moves');
    const finalTimeDisplay = document.getElementById('final-time');

    const emojis = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎢', '🎡'];
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let timer = 0;
    let timerInterval = null;
    let isProcessing = false;

    function startTimer() {
        if (timerInterval) return;
        timerInterval = setInterval(() => {
            timer++;
            updateTimer();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function updateTimer() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function shuffleCards() {
        const cardPairs = [...emojis, ...emojis];
        return cardPairs.sort(() => Math.random() - 0.5);
    }

    function createCard(emoji, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="card-front">${emoji}</div>
            <div class="card-back">?</div>
        `;
        
        card.addEventListener('click', () => flipCard(card));
        return card;
    }

    function flipCard(card) {
        if (isProcessing || 
            flippedCards.length === 2 || 
            flippedCards.includes(card) ||
            card.classList.contains('matched')) {
            return;
        }

        if (flippedCards.length === 0) {
            startTimer();
        }

        card.classList.add('flip');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            isProcessing = true;
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const match = card1.querySelector('.card-front').textContent === 
                     card2.querySelector('.card-front').textContent;

        if (match) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            
            if (matchedPairs === emojis.length) {
                setTimeout(showWinMessage, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flip');
                card2.classList.remove('flip');
            }, 1000);
        }

        setTimeout(() => {
            flippedCards = [];
            isProcessing = false;
        }, 1000);
    }

    function showWinMessage() {
        stopTimer();
        finalMovesDisplay.textContent = moves;
        finalTimeDisplay.textContent = timerDisplay.textContent;
        winMessage.classList.remove('hidden');
    }

    function initializeGame() {
        // Reset game state
        gameBoard.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        timer = 0;
        stopTimer();
        updateTimer();
        movesDisplay.textContent = moves;
        winMessage.classList.add('hidden');

        // Create and shuffle cards
        const shuffledEmojis = shuffleCards();
        shuffledEmojis.forEach((emoji, index) => {
            const card = createCard(emoji, index);
            gameBoard.appendChild(card);
        });
    }

    // Event listeners
    restartBtn.addEventListener('click', initializeGame);
    playAgainBtn.addEventListener('click', initializeGame);

    // Initialize the game
    initializeGame();
});
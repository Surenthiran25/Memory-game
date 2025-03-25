class MemoryGame {
    constructor() {
        this.gameBoard = document.querySelector('.game-board');
        this.restartButton = document.querySelector('#restart');
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isProcessing = false;

        this.symbols = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎟️', '🎬'];
        this.init();
    }

    init() {
        this.createCards();
        this.addEventListeners();
    }

    createCards() {
        const cardPairs = [...this.symbols, ...this.symbols];
        this.shuffleArray(cardPairs);

        this.gameBoard.innerHTML = '';
        cardPairs.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            this.gameBoard.appendChild(card);
        });
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    addEventListeners() {
        this.gameBoard.addEventListener('click', (e) => this.handleCardClick(e));
        this.restartButton.addEventListener('click', () => this.restartGame());
    }

    handleCardClick(e) {
        const card = e.target;
        if (!card.classList.contains('card') || 
            card.classList.contains('flipped') || 
            card.classList.contains('matched') ||
            this.isProcessing) {
            return;
        }

        this.flipCard(card);
        this.checkMatch();
    }

    flipCard(card) {
        card.classList.add('flipped');
        card.textContent = card.dataset.symbol;
        this.flippedCards.push(card);
    }

    checkMatch() {
        if (this.flippedCards.length !== 2) return;

        this.isProcessing = true;
        const [card1, card2] = this.flippedCards;

        if (card1.dataset.symbol === card2.dataset.symbol) {
            this.handleMatch(card1, card2);
        } else {
            this.handleMismatch(card1, card2);
        }
    }

    handleMatch(card1, card2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.matchedPairs++;
        this.resetFlippedCards();

        if (this.matchedPairs === this.symbols.length) {
            setTimeout(() => alert('Congratulations! You won!'), 500);
        }
    }

    handleMismatch(card1, card2) {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            this.resetFlippedCards();
        }, 1000);
    }

    resetFlippedCards() {
        this.flippedCards = [];
        this.isProcessing = false;
    }

    restartGame() {
        this.matchedPairs = 0;
        this.flippedCards = [];
        this.isProcessing = false;
        this.createCards();
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});
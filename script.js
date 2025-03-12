const gameBoard = document.getElementById("gameBoard");
const restartButton = document.getElementById("restart");

const symbols = ["🍎", "🍌", "🍇", "🍒", "🍎", "🍌", "🍇", "🍒"];
let shuffledSymbols = shuffle(symbols);
let flippedCards = [];
let matchedPairs = 0;

// Shuffle function
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Initialize game board
function createBoard() {
    gameBoard.innerHTML = "";
    shuffledSymbols.forEach((symbol, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.innerText = "?";
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card logic
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.innerText = this.dataset.symbol;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check if two flipped cards match
function checkMatch() {
    let [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add("hidden");
        card2.classList.add("hidden");
        matchedPairs++;
        if (matchedPairs === symbols.length / 2) {
            setTimeout(() => alert("You won! 🎉"), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerText = "?";
            card2.innerText = "?";
        }, 1000);
    }
    flippedCards = [];
}

// Restart game
restartButton.addEventListener("click", () => {
    shuffledSymbols = shuffle(symbols);
    flippedCards = [];
    matchedPairs = 0;
    createBoard();
});

// Start game
createBoard();


document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".game-board");
    const restartBtn = document.getElementById("restart");

    let cardsArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let gameCards = [...cardsArray, ...cardsArray]; 
    let flippedCards = [];
    let matchedPairs = 0;

    function shuffleCards() {
        gameCards.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
        board.innerHTML = "";
        shuffleCards();
        gameCards.forEach((letter, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.letter = letter;
            card.dataset.index = index;
            card.textContent = "?";
            card.addEventListener("click", flipCard);
            board.appendChild(card);
        });
    }

    function flipCard() {
        if (flippedCards.length < 2) {
            this.classList.add("flipped");
            this.textContent = this.dataset.letter;
            flippedCards.push(this);
        }

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.letter === card2.dataset.letter) {
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === cardsArray.length) {
                setTimeout(() => alert("You won!"), 300);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1.textContent = "?";
                card2.textContent = "?";
                flippedCards = [];
            }, 500);
        }
    }

    restartBtn.addEventListener("click", () => {
        matchedPairs = 0;
        flippedCards = [];
        createBoard();
    });

    createBoard();
});

import React, { useState, useEffect } from 'react';
import { Brain, Trophy, RotateCcw } from 'lucide-react';

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const emojis = ['🌟', '🎨', '🌈', '🎭', '🎪', '🎯', '🎲', '🎮'];
const initialCards: Card[] = [...emojis, ...emojis]
  .map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }))
  .sort(() => Math.random() - 0.5);

function App() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setCards(cards.map((card, index) =>
          index === first || index === second
            ? { ...card, isMatched: true }
            : card
        ));
      }
      setTimeout(() => {
        setCards(cards.map((card, index) =>
          index === first || index === second
            ? { ...card, isFlipped: false }
            : card
        ));
        setFlippedCards([]);
      }, 1000);
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    const allMatched = cards.every(card => card.isMatched);
    if (allMatched && cards.length > 0) {
      setGameWon(true);
      if (!bestScore || moves < bestScore) {
        setBestScore(moves);
      }
    }
  }, [cards, moves, bestScore]);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    setCards(cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards([...flippedCards, index]);
  };

  const resetGame = () => {
    setGameWon(false);
    setMoves(0);
    setFlippedCards([]);
    setCards(initialCards.map(card => ({ ...card, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Memory Game</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-gray-600">
                Moves: <span className="font-bold text-indigo-600">{moves}</span>
              </div>
              {bestScore && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Best: <span className="font-bold text-indigo-600">{bestScore}</span>
                </div>
              )}
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-xl text-4xl flex items-center justify-center transition-all duration-300 transform ${
                  card.isFlipped || card.isMatched
                    ? 'bg-white border-2 border-indigo-600 rotate-0'
                    : 'bg-indigo-600 rotate-y-180'
                } ${card.isMatched ? 'opacity-50' : ''}`}
                disabled={card.isMatched}
              >
                {(card.isFlipped || card.isMatched) && card.emoji}
              </button>
            ))}
          </div>

          {gameWon && (
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold text-indigo-600">
                Congratulations! 🎉
              </h2>
              <p className="text-gray-600 mt-2">
                You won in {moves} moves!
                {bestScore === moves && ' That\'s a new best score!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
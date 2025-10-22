import React from "react";
import Card from "./Card";

const DECK = [
  { id: 1, pairId: "amazon", frontImage: "/images/amazon.jpg" },
  { id: 2, pairId: "dorito", frontImage: "/images/dorito.jpg" },
  { id: 3, pairId: "microsoft", frontImage: "/images/microsoft.jpg" },
  { id: 4, pairId: "petta", frontImage: "/images/petta.jpg" },
  { id: 5, pairId: "amazon", frontImage: "/images/amazon.jpg" },
  { id: 6, pairId: "dorito", frontImage: "/images/dorito.jpg" },
  { id: 7, pairId: "microsoft", frontImage: "/images/microsoft.jpg" },
  { id: 8, pairId: "petta", frontImage: "/images/petta.jpg" },
  { id: 9, pairId: "netflix", frontImage: "/images/netflix.jpg" },
  { id: 10, pairId: "archive", frontImage: "/images/archive.jpg" },
  { id: 11, pairId: "netflix", frontImage: "/images/netflix.jpg" },
  { id: 12, pairId: "archive", frontImage: "/images/archive.jpg" },

  
];

function Board() {
  // helper: returns a fresh shuffled deck with runtime flags
  function getShuffledDeck() {
    // copy deck and add runtime flags
    const deckWithState = DECK.map(card => ({ ...card, isFlipped: false, isMatched: false }));
    // Fisher-Yates shuffle
    for (let i = deckWithState.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckWithState[i], deckWithState[j]] = [deckWithState[j], deckWithState[i]];
    }
    return deckWithState;
  }

  const [cards, setCards] = React.useState(() => getShuffledDeck());
  const [firstSelection, setFirstSelection] = React.useState(null);
  const [lockBoard, setLockBoard] = React.useState(false);

  function resetSelections() {
    setFirstSelection(null);
    setLockBoard(false);
  }

  function handleCardClick(id) {
    if (lockBoard) return;

    setCards(prev =>
      prev.map(c => (c.id === id && !c.isMatched && !c.isFlipped ? { ...c, isFlipped: true } : c))
    );

    const clickedCard = cards.find(c => c.id === id);

    if (!firstSelection) {
      setFirstSelection(id);
      return;
    }

    if (firstSelection === id) return;

    const firstCard = cards.find(c => c.id === firstSelection);

    if (!firstCard || !clickedCard) return;

    if (firstCard.pairId === clickedCard.pairId) {
      // match
      setCards(prev =>
        prev.map(c =>
          c.id === id || c.id === firstSelection ? { ...c, isMatched: true } : c
        )
      );
      resetSelections();
      return;
    }

    // not a match: lock board and flip back after delay
    setLockBoard(true);
    setTimeout(() => {
      setCards(prev =>
        prev.map(c =>
          c.id === id || c.id === firstSelection ? { ...c, isFlipped: false } : c
        )
      );
      resetSelections();
    }, 800); // match your CSS animation duration
  }

  // New Game handler: reshuffle and reset everything
  function handleNewGame() {
    setCards(getShuffledDeck());
    setFirstSelection(null);
    setLockBoard(false);
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Memory Game</h2>
        <div className="space-x-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleNewGame}
          >
            New Game
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 justify-center items-center">
        {cards.map(card => (
          <Card
            key={card.id}
            frontImage={card.frontImage}
            backImage="/images/default.png"
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
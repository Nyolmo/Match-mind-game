import React from "react";
import Card from "./Card";
import { incrementTurn } from "./Count";

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
  const getShuffledDeck = () => {
    const deckWithState = DECK.map(card => ({
      ...card,
      isFlipped: false,
      isMatched: false,
    }));

    for (let i = deckWithState.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckWithState[i], deckWithState[j]] = [deckWithState[j], deckWithState[i]];
    }

    return deckWithState;
  };

  const [cards, setCards] = React.useState(() => getShuffledDeck());
  const [firstSelection, setFirstSelection] = React.useState(null);
  const [lockBoard, setLockBoard] = React.useState(false);
  const [turnCount, setTurnCount] = React.useState(0);

  const resetSelections = () => {
    setFirstSelection(null);
    setLockBoard(false);
  };

  const handleCardClick = (id) => {
    if (lockBoard) return;

    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    setCards(prev =>
      prev.map(c => (c.id === id ? { ...c, isFlipped: true } : c))
    );

    if (!firstSelection) {
      setFirstSelection(id);
      return;
    }

    incrementTurn(setTurnCount);

    const firstCard = cards.find(c => c.id === firstSelection);

    if (firstCard.pairId === clickedCard.pairId) {
      setCards(prev =>
        prev.map(c =>
          c.id === id || c.id === firstSelection ? { ...c, isMatched: true } : c
        )
      );
      resetSelections();
    } else {
      setLockBoard(true);
      setTimeout(() => {
        setCards(prev =>
          prev.map(c =>
            c.id === id || c.id === firstSelection ? { ...c, isFlipped: false } : c
          )
        );
        resetSelections();
      }, 800);
    }
  };

  const handleNewGame = () => {
    setCards(getShuffledDeck());
    setFirstSelection(null);
    setLockBoard(false);
    setTurnCount(0);
  };

  return (
    <div className="min-h-screen p-6 bg-linear-to-b from-purple-100 via-purple-200 to-purple-300 flex flex-col items-center">
    
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-2 font-[Courier]">
          Mind Match Game
        </h1>
        <button
          className="px-8 py-2 bg-gray-500 font-bold text-black border-3 rounded-2xl text-3xl border-black hover:bg-blue-700 transition font-[Courier]"
          onClick={handleNewGame}
        >
          New Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 max-w-4xl w-full">
        {cards.map(card => (
          <div key={card.id} className="w-full">
            <Card
              frontImage={card.frontImage}
              backImage="/images/default.png"
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => handleCardClick(card.id)}
            />
          </div>
        ))}
      </div>

      <h2 className="text-center text-xl sm:text-4xl font-semibold mt-6 font-[Courier]">
        Turns Taken: {turnCount}
      </h2>
    </div>
  );
}

export default Board;

import React from "react";
import "../styles/App.css";

function Card({ frontImage, backImage, isFlipped, isMatched, onClick }) {
  function handleClick() {
    if (isMatched) return;
    if (typeof onClick === "function") onClick();
  }

  return (
    <div
      className="card relative w-24 h-32 perspective cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`card-inner relative w-full h-full duration-500 transform-style-3d ${
          isFlipped || isMatched ? "rotate-y-180" : ""
        }`}
      >
        <div className="card-front absolute w-full h-full backface-hidden">
          <img
            src={isFlipped ? frontImage : backImage}
            alt="card front"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
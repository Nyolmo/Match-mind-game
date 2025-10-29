import React from "react";
import "../styles/App.css";

function Card({ frontImage, backImage, isFlipped, isMatched, onClick }) {
  function handleClick() {
    if (isMatched) return;
    if (typeof onClick === "function") onClick();
  }

  return (
    <div
      onClick={handleClick}
      className="w-full aspect-square cursor-pointer perspective"
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d preserve-3d ${
          isFlipped || isMatched ? "rotate-y-180" : ""
        }`}
      >

        <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden">
          <img
            src={backImage} 
            alt="card back"
            className="w-full h-full object-cover"
          />
        </div>

      
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-lg overflow-hidden">
          <img
            src={frontImage} 
            alt="card front"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;

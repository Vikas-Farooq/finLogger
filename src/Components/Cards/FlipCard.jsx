import React from 'react';
import './Card.jsx';

const FlipCard = ({ frontText, amount, label, currency = "Rs", textColor = "text-green-500" }) => {
  return (
    <div className="flip-card w-full h-40">
      <div className="flip-card-inner rounded">
        {/* Front Side */}
        <div className="flip-card-front rounded bg-gray-800 text-white">
          {frontText}
        </div>

        {/* Back Side */}
        <div className="flip-card-back rounded bg-gray-800">
          <div className={`${textColor}`}>
            <div className="text-3xl font-bold">{currency}</div>
            <div className="text-gray-300">{label}</div>
            <div className="text-2xl font-bold">{amount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

import React from 'react';

const HomeButtons = ({ text, onClick, Icon }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center sm:justify-start px-4 py-3 mb-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold tracking-wide shadow-sm hover:shadow-md transition duration-200 mb-4"
    >
      {Icon && <Icon className="w-5 h-5 mr-0 sm:mr-3 text-white" />}
      <span className="text-sm sm:text-base">{text}</span>
    </button>
  );
};

export default HomeButtons;

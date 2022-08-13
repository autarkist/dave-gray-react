import React from 'react';

const Square = ({bgcolor, hexValue, isDarkText}) => {
  return (
    <div 
      className="box"
      style={{
        backgroundColor: bgcolor,
        // color: bgcolor === "black" ? "white" : "black"
        color: isDarkText ? "#000" : "#FFF"
      }}
    >
      <p>{bgcolor ? bgcolor : "Empty Value"}</p>
      <p>{hexValue ? hexValue : null}</p>
    </div>
  );
};

export default Square;
import React from 'react';
import { useState, useRef } from 'react';
import Input from './Input';
import Square from './Square';

const App = () => {
  const [bgcolor, setColor] = useState('')
  const [hexValue, setHexValue] = useState('')
  const [isDarkText, setIsDarkText] = useState(true)
  return (
    <div className="container">
      <Square 
        bgcolor={bgcolor}
        hexValue={hexValue}
        isDarkText={isDarkText}
      />
      <Input
        bgcolor={bgcolor}
        setColor={setColor}
        setHexValue={setHexValue}
        isDarkText={isDarkText}
        setIsDarkText={setIsDarkText}
      />
    </div>
  );
};

export default App;
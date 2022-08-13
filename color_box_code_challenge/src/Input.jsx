import React, { useRef } from 'react';
import colorNames from 'colornames';

const Input = ({
    bgcolor, 
    setColor, 
    setHexValue,
    isDarkText,
    setIsDarkText
  }) => {
  const inputRef = useRef();
  const handleColor = (e) => {
    setColor(e.target.value);
    setHexValue(colorNames(e.target.value));
    inputRef.current.focus();
  }
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      e.target.select();
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="Color Name">Add Color Name:</label>
      <input 
        autoFocus
        ref ={inputRef} 
        type="text" 
        required
        value = {bgcolor} 
        onChange={handleColor}
        onKeyDown={handleKeyDown}
        placeholder='Type in Color you like'
      />
      <button
        type='button'
        onClick={() => setIsDarkText(!isDarkText)}
      >
        Toggle Text Color
      </button>
    </form>
  );
};

export default Input;
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const Content = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "One half pound of Cocoa Covered Almonds Unsalted",
    },
    {
      id: 2,
      checked: false,
      item: "Two half pound of Cocoa Covered Almonds Unsalted",
    },
    {
      id: 3,
      checked: false,
      item: "Three half pound of Cocoa Covered Almonds Unsalted",
    }
  ])

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item)
    setItems(listItems);
  }

  return (
    <main>
      <ul>
        {items.map((item) => (
          <li className='item' key={item.id}>
            <input
              type="checkbox"
              onChange={() => handleCheck(item.id)}
              checked={item.checked}
            />
            <label>{item.item}</label>
            <FaTrash role="button" tabIndex="0" />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Content;
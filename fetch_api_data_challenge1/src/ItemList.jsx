import React from 'react';

const ItemList = ({item}) => {
  return (
    <li>
      {JSON.stringify(item)}
    </li>
  );
};

export default ItemList;
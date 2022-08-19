import React from 'react';
import ItemList from './ItemList';

const List = ({items}) => {
  return (
    <ul>
      {items.map(item => (
        <ItemList key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default List;
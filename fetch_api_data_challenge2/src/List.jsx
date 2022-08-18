import React from 'react';
import ItemList from './ItemList';

const List = ({items}) => {
  return (
    <table>
      <tbody>
      {items.map(item => (
        <ItemList key={item.id} item={item} />
      ))}
      </tbody>
    </table>
  );
};

export default List;
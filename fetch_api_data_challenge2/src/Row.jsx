import React from 'react';
import Cell from './Cell';

const Row = ({item}) => {
  return (
    <tr>
      {Object.entries(item).map(([k, v]) => (
        <Cell key={k} cellData={JSON.stringify(v)} />
      ))}
    </tr>
  );
};

export default Row;
import React from 'react';
import { Button } from 'react-bootstrap';

const Square = ({onClick, value}) => {
  return (
    <div>
      <Button
        variant={"outline-dark"}
        className="square"
        onClick={onClick}>{value}</Button>
    </div>
  );
}

export default Square;

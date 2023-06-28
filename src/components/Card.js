import React from 'react';

const Card = ({ name }) => {
  return (
    <div className='card'>
      <h2>{name.toUpperCase()}</h2>
    </div>
  )
}

export default Card;
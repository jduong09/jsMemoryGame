import React from 'react';

const Card = ({ cardIdx, name, imgUrl, hide, handleClick }) => {
  return (
    <li className="card">
      <div data-idx={cardIdx} data-name={name} onClick={handleClick}>
        <h2 className={hide === 'name' ? 'hide' : ''}>{name.toUpperCase()}</h2>
        <img id={`img-${name}`} className={hide === 'name' ? '' : 'hide'} src={imgUrl} alt={`${name} pokemon`} />
      </div>
    </li>
  )
}

export default Card;
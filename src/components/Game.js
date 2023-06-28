import React from 'react';
import Card from './Card';

const Game = ({ pokemonData }) => {
  console.log(pokemonData);
  const [score, setScore] = React.useState(0);

  const listOfCards = pokemonData.map((name, idx) => {
    return <Card key={idx} name={name} />
  });

  return (
    <div id="div-game">
      Current Score: {score}
      {listOfCards}
    </div>
  )
}

export default Game;
import React from 'react';
import Card from './Card';

const Game = ({ pokemonData, resetGame }) => {
  const [cards, setCards] = React.useState([]);
  const [cardsMatched, setCardsMatched] = React.useState(10);
  const [chosenCardIdx, setChosenCardIdx] = React.useState('');
  const [turns, setTurns] = React.useState(0);

  React.useEffect(() => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    if (pokemonData.length) {
      for (let i = 0; i <= 9; i++) {
        let randomInt;
        while (!arr.includes(randomInt)) {
          randomInt = randomIntFromInterval(1, 20);
        }
        arr.splice(arr.indexOf(randomInt), 1, { name: pokemonData[i].name, imgUrl: pokemonData[i].imgUrl, hide: 'name' });
  
        let secondRandomInt;
        while (!arr.includes(secondRandomInt)) {
          secondRandomInt = randomIntFromInterval(1, 20);
        }
        arr.splice(arr.indexOf(secondRandomInt), 1, { name: pokemonData[i].name, imgUrl: pokemonData[i].imgUrl, hide: 'image' });
      }
      setCards(cards.concat(arr));
    }
  }, [pokemonData]);

  React.useEffect(() => {
    const divGameOver = document.getElementById('div-game-over');
    if (cardsMatched === 0) {
      divGameOver.classList.remove('hide');
      setCardsMatched(10);
    }
  }, [cardsMatched]);

  const handleClick = (e) => {
    e.preventDefault();
    const currentChosenCard = e.currentTarget;
    const cardIdx = e.currentTarget.getAttribute('data-idx');
    const pokemonName = e.currentTarget.getAttribute('data-name');

    currentChosenCard.classList.remove('hidden');

    if (chosenCardIdx === '') {
      setChosenCardIdx(cardIdx);
    } else {
      const previousChosenCard = document.querySelector(`div[data-idx="${chosenCardIdx}"]`);
      const previousChosenCardName = previousChosenCard.getAttribute('data-name');
      if (pokemonName === previousChosenCardName) {
        currentChosenCard.parentElement.classList.add('matched');
        previousChosenCard.parentElement.classList.add('matched');
        previousChosenCard.classList.remove('hidden');
        setCardsMatched(cardsMatched - 1);
      } else {
        currentChosenCard.parentElement.classList.add('nonmatched');
        previousChosenCard.parentElement.classList.add('nonmatched');
        setTimeout(() => {
          currentChosenCard.classList.add('hidden');
          previousChosenCard.classList.add('hidden');
          currentChosenCard.parentElement.classList.remove('nonmatched');
          previousChosenCard.parentElement.classList.remove('nonmatched')
        }, 2000);
      }
      setChosenCardIdx('');
      setTurns(turns + 1);
    }
  }

  const handleGameStart = (e) => {
    e.preventDefault();
    hideCards();
    setTurns(0);
  }

  const listOfCards = cards.map((data, idx) => {
    return <Card key={idx} cardIdx={idx} name={data.name} imgUrl={data.imgUrl} hide={data.hide} handleClick={handleClick} />
  });

  return (
    <div id="div-game">
      <button id="btn-game-start" onClick={handleGameStart}>Play Game</button>
      <ul id="list-cards">
        {listOfCards}
      </ul>
      <div id="div-game-over" className="hide">
        <h2>Game Over!</h2>
        <div>{`You won in ${turns} turns!`}</div>
        <button id="btn-reset" onClick={resetGame}>Play Again</button>
      </div>
    </div>
  )
}

function randomIntFromInterval(min, max) {
  // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
const revealCards = () => {
  const cards = document.querySelectorAll('.card > div');
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('hidden');
  }
}
*/

const hideCards = () => {
  const cards = document.querySelectorAll('.card > div');
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add('hidden');
  }
}

export default Game;
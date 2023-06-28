import React from 'react';
import Card from './Card';

const Game = ({ pokemonData }) => {
  const [score, setScore] = React.useState(0);
  const [cards, setCards] = React.useState([]);
  const [cardsMatched, setCardsMatched] = React.useState(10);
  const [chosenCardIdx, setChosenCardIdx] = React.useState('');

  // Create 20 divs and then populate them randomly with the url and name.
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
    if (cardsMatched === 0) {
      console.log('Game Over');
    }
  }, [cardsMatched])

  const handleClick = (e) => {
    e.preventDefault();
    const currentChosenCard = e.currentTarget;
    const cardIdx = e.currentTarget.getAttribute('data-idx');
    const pokemonName = e.currentTarget.getAttribute('data-name');
    console.log(e.currentTarget);

    currentChosenCard.classList.remove('hidden');

    if (chosenCardIdx === '') {
      setChosenCardIdx(cardIdx);
    } else {
      const previousChosenCard = document.querySelector(`div[data-idx="${chosenCardIdx}"]`);
      const previousChosenCardName = previousChosenCard.getAttribute('data-name');
      if (pokemonName === previousChosenCardName) {
        console.log('Match');
        previousChosenCard.classList.remove('hidden');
        setCardsMatched(cardsMatched - 1);
      } else {
        console.log('No Match');
        setTimeout(() => {
          console.log(e.currentTarget);
          currentChosenCard.classList.add('hidden');
          console.log(previousChosenCard);
          previousChosenCard.classList.add('hidden');
        }, 2500);
      }
      setChosenCardIdx('');
    }
  }

  const handleGameStart = (e) => {
    e.preventDefault();

    hideCards();
  }

  const listOfCards = cards.map((data, idx) => {
    return <Card key={idx} cardIdx={idx} name={data.name} imgUrl={data.imgUrl} hide={data.hide} handleClick={handleClick} />
  });

  return (
    <div id="div-game">
      Current Score: {score}
      <button onClick={handleGameStart}>Play Game</button>
      <ul id="list-cards">
        {listOfCards}
      </ul>
    </div>
  )
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const revealCards = () => {
  const cards = document.querySelectorAll('.card > div');
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('hidden');
  }
}

const hideCards = () => {
  const cards = document.querySelectorAll('.card > div');
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add('hidden');
  }
}

export default Game;

/* 
Game starts by showing all the cards and their locations.
Player clicks button 'Play Game'
All cards are flipped over (flip card animation) and their faces are hidden
Game waits for player to click one card.
  // On Click, card is flipped and face is revealed.
Game waits for player to click second card
  // On Click, card is flipped and face is revealed
  // If Both cards match, dataset-name
    // cards stay flipped 
  // If both cards do not math
    // cards are flipped, face is hidden
Game ends when all cards are revealed
Game's scoring is based on time it took to flip all cards
Game's scoring is based on how many turns it took to flip all cards.
*/
import React from 'react';
import '../styles/App.css';
import Game from './Game';

const App = () => {
  const [pokemonData, setPokemonData] = React.useState([]);
  // Leave dependency array empty, similar to componentDidMount
  // Means the hook runs one time when the component mounts.
  React.useEffect(() => {
    (async function() {
      const newArr = [];
      for (let i = 1; i <= 10; i++) {
        const pokemon = await fetchPokemon(i);
        const name = pokemon.name;
        const imgUrl = pokemon.sprites.front_default;
        newArr.push({
          id: i,
          name: name,
          imgUrl: imgUrl
        });
      }
      setPokemonData(pokemonData.concat(newArr));
    })();
  }, []);

  const resetGame = (e) => {
    e.preventDefault();
    const divGameOver = document.getElementById('div-game-over');
    const listOfCards = document.getElementById('list-cards');
    divGameOver.classList.add('hide');
    listOfCards.innerText = '';
    const arr = [];

    for (let j = 0; j < 10; j++) {
      let randomNum = Math.floor(Math.random() * (20 - 1 + 1) + 1);
      while (arr.includes(randomNum)) {
        randomNum = Math.floor(Math.random() * (20 - 1 + 1) + 1);
      }
      arr.push(randomNum);
    }
    
    (async function() {
      const newArr = [];
      for (let i = 0; i < arr.length; i++) {
        const pokemon = await fetchPokemon(arr[i]);
        const name = pokemon.name;
        const imgUrl = pokemon.sprites.front_default;
        newArr.push({
          id: i,
          name: name,
          imgUrl: imgUrl
        });
      }
      setPokemonData(newArr);
    })();
  };

  return (
    <div className="App">
      <Game pokemonData={pokemonData} resetGame={resetGame} />
    </div>
  );
}

const fetchPokemon = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (response.ok) {
    return response.json();
  }
}

export default App;

import React from 'react';

import '../styles/App.css';
import Game from './Game';

/*
Pokemon Memory Game

we'll use 10 pokemon, so 20 cards
// match pokemon image with it's name.


// Keep a scoreboard, counts the current score and a "best Score".
// Need to make api call to pokemon website to receive images and names
// Need to make cards with a name and an image to display
*/
const App = () => {
  const [pokemonData, setPokemonData] = React.useState([]);
  // Leave dependency array empty, similar to componentDidMount
  // Means the hook runs one time when the component mounts.
  React.useEffect(() => {
    async function fetchPokemon(id) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (response.ok) {
        return response.json();
      }
    }
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
    // Make api call to pokemon api, retreive 20 pokemon names and images.
  }, []);

  // Component did mount, we want to run an api call.
  return (
    <div className="App">
      <Game pokemonData={pokemonData} />
    </div>
  );
}

export default App;

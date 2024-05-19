import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PokemonPool extends Component {
  state = {
    pokemon: [],
  };

  async componentDidMount() {
    const storedPokemon = [];
    const numPokemon = 120; // number of Pokémon to fetch from the API
    const localStorageKeys = Object.keys(localStorage);

    // Fetch Pokémon from localStorage
    localStorageKeys.forEach((key) => {
      if (!isNaN(key) && parseInt(key) >= 1) { // Ensure the key is a number and is a valid ID
        storedPokemon.push(JSON.parse(localStorage.getItem(key)));
      }
    });

    // Fetch Pokémon from the API
    const apiPokemonPromises = [];
    for (let i = 1; i <= numPokemon; i++) {
      apiPokemonPromises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`));
    }

    const apiPokemonResponses = await Promise.all(apiPokemonPromises);
    const apiPokemon = apiPokemonResponses.map((response) => ({
      name: response.data.name,
      height: response.data.height * 10, // convert to cm
      weight: response.data.weight * 100, // convert to g
      abilities: response.data.abilities.map((ability) => ability.ability.name).join(', '),
      stats: {
        hp: response.data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        attack: response.data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
        defense: response.data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
        speAttack: response.data.stats.find((stat) => stat.stat.name === 'special-attack').base_stat,
        speDefense: response.data.stats.find((stat) => stat.stat.name === 'special-defense').base_stat,
        speed: response.data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
      },
      pokemonId: response.data.id.toString(),
      Iurl: response.data.sprites.front_default,
      pokemonTypes: response.data.types.map((type) => type.type.name),
    }));

    // Create a map for API Pokémon
    const apiPokemonMap = new Map(apiPokemon.map((pokemon) => [pokemon.pokemonId, pokemon]));

    // Override API Pokémon with stored Pokémon if they have the same ID
    storedPokemon.forEach((storedPoke) => {
      apiPokemonMap.set(storedPoke.pokemonId, storedPoke);
    });

    // Convert the map back to an array
    const combinedPokemon = Array.from(apiPokemonMap.values());

    // Update the state with combined Pokémon list
    this.setState({ pokemon: combinedPokemon });
  }

  render() {
    return (
      <div>
        <Link to="/pokemon/create">
          <button className="btn btn-primary mb-4">Create Pokémon</button>
        </Link>
        <div className="row">
          {this.state.pokemon.map((pokemon) => (
            <Card
              key={pokemon.pokemonId}
              name={pokemon.name}
              url={`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemonId}/`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PokemonPool;
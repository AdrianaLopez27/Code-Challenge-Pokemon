import React, { Component } from 'react'
import axios from 'axios';
import Card from './Card'

export default class PokemonPool extends Component {
  state={
    url:'https://pokeapi.co/api/v2/pokemon/',
    pokemon: null
  }
  async componentDidMount(){
    const res = await axios.get(this.state.url);
    this.setState({pokemon: res.data['results']});
  }
  
  
  render() {
    return (
      <div>
        {this.state.pokemon ? (
          <div class='row'>
              {this.state.pokemon.map(pokemon => (
                <Card
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                />
              ))}
          </div>
        ) : (
          <h3>Waiting... Pokemons are loading</h3>
          
        )}
          
      </div>
        
    );
  }
}

import React, { Component } from 'react';
import { withRouter } from './withRouter';

class CreatePokemon extends Component {
  state = {
    name: '',
    height: '',
    weight: '',
    abilities: ''
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSave = () => {
    
        // Generate an ID for the new Pokémon ->it will be unique
        let lastPokemonId = 129; // Valor por defecto si el localStorage está vacío
        if (localStorage.length > 0) {
            const keys = Object.keys(localStorage).map(key => parseInt(key));
            const maxId = Math.max(...keys);
            lastPokemonId = maxId >= 130 ? maxId + 1 : 130;
        }
      
        //pre determinates values for the pokemon to avoin null values
        const { name, height, weight, abilities } = this.state;
        const newPokemon = {
          name: name || ' ',
          height: height || 1,
          weight: weight || 1,
          abilities: abilities || ' ',
          stats: {
            hp: 50,
            attack: 72,
            defense: 83,
            speAttack: 95,
            speDefense: 98,
            speed: 86
          },
          pokemonId: lastPokemonId.toString(),
          Iurl: `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${lastPokemonId}.png?raw=true`, // Will take a pokemon image that is equal as id
          pokemonTypes: ['normal']
        };
      
        // save new Pokémon in localStorage
        localStorage.setItem(lastPokemonId.toString(), JSON.stringify(newPokemon));
      
        this.props.router.navigate(`/pokemon/${lastPokemonId}`);
      };

  render() {
    const { name, height, weight, abilities } = this.state;

    return (
      <div>
        <h2>Create New Pokémon</h2>
        <form>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Height (cm):</label>
            <input
              type="number"
              name="height"
              value={height}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Weight (g):</label>
            <input
              type="number"
              name="weight"
              value={weight}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Abilities:</label>
            <input
              type="text"
              name="abilities"
              value={abilities}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="button" onClick={this.handleSave}>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(CreatePokemon);
import React, { Component } from 'react';
import { withRouter } from './withRouter';

class EditPokemon extends Component {
  state = {
    name: '',
    height: '',
    weight: '',
    abilities: '',
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speAttack: '',
      speDefense: '',
      speed: ''
    },
    pokemonId: '',
    Iurl: '',
    pokemonTypes: []
  };

  componentDidMount() {
    const { pokemonId } = this.props.router.params;
    const { originalPokemon } = this.props.router.location.state || {};

    if (originalPokemon) {
      this.setState({ ...originalPokemon });
    } else {
      const storedPokemon = JSON.parse(localStorage.getItem(pokemonId));
      if (storedPokemon) {
        this.setState({ ...storedPokemon });
      }
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSave = () => {
    const { pokemonId } = this.props.router.params;
    const { name, height, weight, ...rest } = this.state;
    const storedPokemon = JSON.parse(localStorage.getItem(pokemonId)) || {};

    const updatedPokemon = {
      ...storedPokemon,
      name: name !== '' ? name : storedPokemon.name,
      height: height !== '' ? height : storedPokemon.height,
      weight: weight !== '' ? weight : storedPokemon.weight,
      abilities: storedPokemon.abilities,
      stats: storedPokemon.stats,
      pokemonId: storedPokemon.pokemonId,
      Iurl: storedPokemon.Iurl,
      pokemonTypes: storedPokemon.pokemonTypes,
      ...rest
    };

    localStorage.setItem(pokemonId, JSON.stringify(updatedPokemon));
    this.props.router.navigate(`/pokemon/${pokemonId}`);
  };

  render() {
    const { name, height, weight } = this.state;

    return (
      <div>
        <h2>Edit Pokémon</h2>
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
          <button type="button" onClick={this.handleSave}>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(EditPokemon);
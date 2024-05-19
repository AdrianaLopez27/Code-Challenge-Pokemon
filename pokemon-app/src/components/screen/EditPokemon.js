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
      <div class='card  rounded-2'>
        <div class='card-header bg-primary rounded-2 rounded-bottom-0'>
          <h2 class='card-title text-center'>Edit Pokémon</h2>
        </div>
        <form>
          <div class='row mx-auto p-4'>
            <div class="col-7">
              <label>Name:</label>
            </div> 
            <div class="col-5"> 
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="col-7">
              <label>Height (cm):</label>
            </div> 
            <div class="col-5">
              <input
                type="number"
                name="height"
                value={height}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="col-7">
              <label>Weight (g):</label>
            </div> 
            <div class="col-5">
              <input
                type="number"
                name="weight"
                value={weight}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div class="d-flex justify-content-center">  
              <button className="btn btn-danger my-4" type="button" onClick={this.handleSave}>
                Save
              </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditPokemon);
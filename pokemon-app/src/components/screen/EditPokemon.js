import React, { Component } from 'react';

class EditPokemon extends Component {
  constructor(props) {
    super(props);
    const { name, weight, height } = props.pokemon; // Obtener los atributos actuales del Pokémon
    this.state = {
      name,
      weight,
      height,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onEdit(this.state); // Llamar a la función de edición pasada como prop
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            name="name" 
            value={this.state.name} 
            onChange={this.handleChange} 
          />
        </div>
        <div>
          <label>Peso:</label>
          <input 
            type="number" 
            name="weight" 
            value={this.state.weight} 
            onChange={this.handleChange} 
          />
        </div>
        <div>
          <label>Altura:</label>
          <input 
            type="number" 
            name="height" 
            value={this.state.height} 
            onChange={this.handleChange} 
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    );
  }
}

export default EditPokemon;
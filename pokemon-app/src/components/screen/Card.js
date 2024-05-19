import React, { Component } from 'react'
import styled from 'styled-components';
import loader from '../images/loading.gif';
import { Link } from 'react-router-dom';

const Sprite = styled.img`
  width: 6em;
  height: 6em;
  display: none;
`;
class Card extends Component {
  state = {
    name: '',
    Iurl: '',
    pokemonId: '',
    imageLoading: true,
    toManyRequests: false
  };
  
  componentDidMount (){
    const { name, url } = this.props;

    if (url) {
      const pokemonId = url.split('/')[url.split('/').length - 2];
      const storedPokemon = JSON.parse(localStorage.getItem(pokemonId));

      if (storedPokemon) {
        this.setState({
          name: storedPokemon.name,
          Iurl: `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`,
          pokemonId
        });
      } else {
        
        const Iurl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`;
        this.setState({
          name,
          Iurl,
          pokemonId
        });
      }
    }
  }

  render() {
    return (
      <div class="col-md-3 col-sm-5 mb-5">
        <Link to={`pokemon/${this.state.pokemonId}`}>
            <div class='card  rounded-5'>
                <div class='card-header bg-primary rounded-5 rounded-bottom-0'>
                    <h3 class='card-title text-center'>
                        {this.state.name}
                    </h3>
                </div>
                 
                <div class='card-body d-flex flex-column align-items-center border border-warning rounded-5 rounded-top-0'>
                    {
                      this.state.imageLoading ? (
                        <img src={loader} style={{ width:'5em', height:'5em' }} className="card-img-top rounded mx-auto d-block mt-2"/>
                      ) : null
                    }
                    <Sprite class="card-img-top rounded mx-auto mt-2 " 
                       onLoad={() => this.setState({ imageLoading: false })}
                       onError={() => this.setState({ toManyRequests: true })}
                       src={this.state.Iurl}
                       style={
                        this.state.toManyRequests? { display: 'none' } : 
                        this.state.imageLoading ? null : { display: 'block' }
                       }
                    />
                    {this.state.toManyRequests ? (
                        <h6 className="mx-auto">
                          <span className="badge badge-danger mt-2">
                            To Many Requests
                          </span>
                        </h6>
                    ) : null} 
                    <h5 >
                        
                        {this.state.pokemonId}
                    </h5>
                    
                </div> 
            </div>
        </Link>
      </div>
    )
  }
  
}
export default Card;
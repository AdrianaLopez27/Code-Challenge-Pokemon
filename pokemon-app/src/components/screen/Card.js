import React, { Component } from 'react'
import styled from 'styled-components';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
`;
export default class Card extends Component {
  state = {
    name: '',
    Iurl: '',
    pokemonId: '',
    imageLoading: true,
    toManyRequests: false
  };
  
  componentDidMount (){
    const {name,url} = this.props;
    const pokemonId = url.split('/')[url.split('/').length - 2];
    const Iurl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`;

    this.setState({
      name,
      Iurl,
      pokemonId
    });
  }

  render() {

    return (
      <div class="col-md-3 col-sm-5 mb-5">
            <div class='card aling-center rounded-5'>
                <div class='card-header bg-primary rounded-5 rounded-bottom-0'>
                    <h2 class='card-title text-center'>
                        {this.state.name}
                    </h2>
                </div>
                  
                <div class='card-body border border-warning rounded-5 rounded-top-0'>
                    <Sprite class="card-img-mid  rounded mx-auto mt-2" 
                       onLoad={() => this.setState({ imageLoading: false })}
                       onError={() => this.setState({ toManyRequests: true })}
                       src={this.state.Iurl}
                    />
                    <h5 >
                        {this.state.pokemonId}
                    </h5>
                    
                </div> 

            </div>
      </div>
    )
  }
}

import React, { Component } from 'react';
import axios from 'axios';

import { withRouter } from './withRouter';

const COLORS = {
	normal: 'A8A77A',
	fire: 'EE8130',
	water: '6390F0',
	electric: 'F7D02C',
	grass: '7AC74C',
	ice: '96D9D6',
	fighting: 'C22E28',
	poison: 'A33EA1',
	ground: 'E2BF65',
	flying: 'A98FF3',
	psychic: 'F95587',
	bug: 'A6B91A',
	rock: 'B6A136',
	ghost: '735797',
	dragon: '6F35FC',
	dark: '705746',
	steel: 'B7B7CE',
	fairy: 'D685AD',
};



class Pokemon extends Component {
    state={
        name : '',
        pokemonId : '',
        Iurl: '',
        pokemonTypes : [],
        stats: {
            hp :'',
            attack:'',
            defense:'',
            speAttack:'',
            speDefense:'',
            speed:''
        },
        height: '',
        weight: '',
        abilities: ''
    }
    
    async componentDidMount(){
        const {pokemonId} = this.props.router.params;

        const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
        //const pokeSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
        //pokemon information
        const pokemonResp = await axios.get(pokeUrl);
        const name = pokemonResp.data.name;
        const Iurl = pokemonResp.data.sprites.front_default;
        let {hp, attack,defense,speAttack,speDefense,speed}='';
        
        pokemonResp.data.stats.map(stat => {
            switch (stat.stat.name) {
              case 'hp':
                hp = stat['base_stat'];
                break;
              case 'attack':
                attack = stat['base_stat'];
                break;
              case 'defense':
                defense = stat['base_stat'];
                break;
              
              case 'special-attack':
                speAttack = stat['base_stat'];
                break;
              case 'special-defense':
                speDefense = stat['base_stat'];
                break;
              case 'speed':
                speed = stat['base_stat'];
                break;
              default:
                break;
            }
        
        });
        //height is in decimeters to cm 
        const height = pokemonResp.data.height * 10;
        //weight of Pokémon in hectograms. to grams
        const weight= pokemonResp.data.weight * 100;
        const pokemonTypes = pokemonResp.data.types.map(type => type.type.name);
        
        const abilities = pokemonResp.data.abilities.map(ability => {
            return ability.ability.name.toLowerCase().split('-')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        }).join(', ');

        this.setState({
            name,
            pokemonId,
            Iurl,
            pokemonTypes,
            stats: {
                hp,
                attack,
                defense,
                speAttack,
                speDefense,
                speed
            },
            height,
            weight,
            abilities
            });
    }
  
    render() {
    return (
      <div>
        <div calss='c-s'>
          <div class='card'>
            <div class='card-header bg-secondary-subtle'>
              <div class='d-flex'>
                <div class='p-2 flex-grow-1 '>
                    <h4>{this.state.name}</h4>
                </div>
                <div class='p-2 '>  
                    <h3>{this. state.pokemonId}</h3>
                </div>
              </div>
            </div>
            <div class='card-body d-flex flex-column align-items-center'>

              <div className="poke-image ">
                  <img src={this.state.Iurl}
                    class="card-img-fluid rounded mx-auto" style={{width: '10em'}}/>
              </div>
              <div class='poke-types'>
                {this.state.pokemonTypes.map(pokeType => (
                  <span key={pokeType}
                    class="badge mx-1"
                    style={{
                      backgroundColor: `#${COLORS[pokeType]}`,
                      color: 'white'
                    }}>
                    {pokeType.toLowerCase().split(' ')
                      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ')}
                </span>
                ))}

              </div>
              <div class="poke_info mt-5">

                <h5 class="card-title text-center">Pokémon Information</h5>
                <div class='row'>  
                  <div class="col-7">
                    <h6 class="float-right">Height:</h6>
                  </div>
                  <div class="col-5">
                    <h6 class="float-left">{this.state.height} cm.</h6>
                  </div>
                  <div class="col-7">
                    <h6 class="float-right">Weight:</h6>
                  </div>
                  <div class="col-5">
                    <h6 class="float-left">{this.state.weight} g</h6>
                  </div>
                  <div className="col-7">
                    <h6 className="float-right">Abilities:</h6>
                  </div>
                  <div className="col-5">
                    <h6 className="float-left">{this.state.abilities}</h6>
                  </div>
                </div>
              </div>


            </div>


          </div>

        </div>
        
      </div>
    )
  }
}
export default withRouter(Pokemon);

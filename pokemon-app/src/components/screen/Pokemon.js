import React, { Component } from 'react';
import axios from 'axios';

import { withRouter } from './withRouter';

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
        <h1>{this.state.height}</h1>
      </div>
    )
  }
}
export default withRouter(Pokemon);

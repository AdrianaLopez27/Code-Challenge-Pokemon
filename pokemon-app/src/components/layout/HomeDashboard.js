import React, { Component } from 'react'
import PokemonPool from '../screen/PokemonPool'

export default class HomeDashboard extends Component {
  
  render() {
    return (
      <div>
        <div class='row'>
            <div class='column'>
                <PokemonPool></PokemonPool>
            </div>

        </div>
        
      </div>
    )
  }
}

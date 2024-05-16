import React, { Component } from 'react'

export default class Card extends Component {
  state = {
    name: '',
    Iurl: '',
    pokemonId: ''
  };
  
  
  
  render() {

    const name = this.props.name;
    const url = this.props.url;
    
    return (
      <div class="col-md-4 col-sm-6 mb-5">
            <div class='card'>
                <div class='header_card'>
                    <h1>
                        {name}
                    </h1>

                </div>  

            </div>
      </div>
    )
  }
}

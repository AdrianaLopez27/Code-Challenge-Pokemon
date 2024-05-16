import React, { Component } from 'react'
import Card from './Card'

export default class PokemonPool extends Component {
  render() {
    return (
      <div class='row'>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
      </div>
    )
  }
}

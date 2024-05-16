import React, { Component } from 'react'

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav class="navbar bg-dark fixed-top">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1">POKEDEX</span>
            </div>
        </nav>
      </div>
    )
  }
}

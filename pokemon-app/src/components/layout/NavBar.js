import React, { Component } from 'react';
import styled from 'styled-components';
import logoImage from '../../assets/logoPokedex.png'

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav class="navbar bg-danger fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src={logoImage} width="120" height="auto"></img>
                </a>
                
            </div>
        </nav>
      </div>
    )
  }
}

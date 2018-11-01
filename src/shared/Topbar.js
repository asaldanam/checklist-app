import React, { Component } from 'react';
// Images
import iconProducts from '../assets/icon/products.svg';

class Tobbar extends Component {

  constructor() {
    super();
    this.state = {};
  };

  render() {
    return ( 
      <div className="c-topbar">
        <header className="c-topbar-container">
          <div className="c-topbar-title">Lista de la compra</div>
          <div className="c-topbar-iconwrapper">
            <img src= {iconProducts} alt=""/>
          </div>
        </header>
      </div>
    );
  }
}

export default Tobbar;
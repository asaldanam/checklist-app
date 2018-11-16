import React, { Component } from 'react';
// Images
import Search from '../assets/icon/search.svg';

class Searchbar extends Component {

  constructor() {
    super();
    this.state = {
    };
  };


  render() {
    return ( 
      <div className="c-searchbar">
        <div className="c-searchbar-container">
          <img  className="c-searchbar-icon" src= {Search} alt=""/>
          <input className="c-searchbar-input" placeholder="Buscar..." type="text" />
        </div>
      </div>
    );
  }
}

export default Searchbar;
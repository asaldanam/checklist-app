import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
          <div className="c-topbar-title">{this.props.title}</div>
          <div className="c-topbar-iconwrapper">
            <Link to="/products">
              <div><img src= {iconProducts} alt=""/></div>
            </Link>
          </div>
        </header>
      </div>
    );
  }
}

export default Tobbar;
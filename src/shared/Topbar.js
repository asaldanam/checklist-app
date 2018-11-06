import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Images
import iconProducts from '../assets/icon/products.svg';
import iconBack from '../assets/icon/back.svg';

class Tobbar extends Component {

  constructor() {
    super();
    this.state = {};
  };


  render() {
    return ( 
      <div className="c-topbar">
        <header className="c-topbar-container">
          {this.props.displayBack ? 
          <div onClick={() => {this.props.history.goBack()}}className="c-topbar-iconback">
            <img src= {iconBack} alt=""/>
          </div>
          : null}
          <div className="c-topbar-title">{this.props.title}</div>
          <div className="c-topbar-iconwrapper">
            {this.props.displayProducts ? 
            <Link to="/products">
              <div><img src= {iconProducts} alt=""/></div>
            </Link>
            : null}
          </div>
        </header>
      </div>
    );
  }
}

export default Tobbar;
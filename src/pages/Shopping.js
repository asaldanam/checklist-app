import React, { Component } from 'react';
// import { BrowserRouter as Link } from "react-router-dom";

// Components
import Topbar from '../components/Topbar';
import ShoppingList from '../components/ShoppingList';

class Shopping extends Component {

  
  constructor() {
    super();
    this.state = {};
  };

  render() {
    return ( 
      <div className={`o-page ${this.props.history.action}`}>
        <Topbar title={'Mi compra'} displayProducts={true}></Topbar>
        <section className="o-section">
          <ShoppingList></ShoppingList>
        </section>
      </div>
    );
  }

}

export default Shopping;
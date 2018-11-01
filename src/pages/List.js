import React, { Component } from 'react';
// Images
import iconProducts from '../assets/icon/products.svg';
// Components
import ListItems from '../shared/ListItems';

class List extends Component {

  
  constructor() {
    super();
    this.state = {};
  };

  componentWillMount() {
    console.log('componentWillMount')
  }

  render() {
    console.log('render')
    return ( 
      <div className="o-page">

          <header className="o-header">
            <div className="g-title">Lista de la compra</div>
            <div className="g-link">
              <span>Ver productos</span>
              <img src= {iconProducts} alt=""/>
            </div>
          </header>

          <ListItems></ListItems>

      </div>
    );
  }

  componentWillUnmount() {
    console.log('call unsubscribe')
  }
}

export default List;
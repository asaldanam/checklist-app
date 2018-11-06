import React, { Component } from 'react';
import { BrowserRouter as Link } from "react-router-dom";

// Components
import Topbar from '../shared/Topbar';
import ListItems from '../shared/ListItems';

class List extends Component {

  
  constructor() {
    super();
    this.state = {};
  };

  render() {
    return ( 
      <div className={`o-page ${this.props.history.action}`}>
        <Topbar title={'Lista'} displayProducts={true}></Topbar>
        <section className="o-section">
          <ListItems></ListItems>
        </section>
      </div>
    );
  }

}

export default List;
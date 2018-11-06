import React, { Component } from 'react';

// Components
import Topbar from '../shared/Topbar';

class Products extends Component {
  
  constructor() {
    super();
    this.state = {};
  };

  render() {
    return ( 
      <div className={`o-page ${this.props.history.action}`}>
        <Topbar
          history={this.props.history}
          displayBack={true} 
          title={'Productos'}
        ></Topbar>
        <section className="o-section">
          asdfasdf
        </section>
      </div>
    );
  }

}

export default Products;
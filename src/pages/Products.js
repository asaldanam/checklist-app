import React, { Component } from 'react';

// Components
import Topbar from '../components/Topbar';
import ProductList from '../components/ProductList';

class Products extends Component {
  
  constructor() {
    super();
    this.state = {};
    this.products = React.createRef();
  };

  onRefresh() {
    this.products.current.onRefresh();
  }

  render() {
    return ( 
      <div className={`o-page ${this.props.history.action}`}>
        <Topbar
          history={this.props.history}
          displayBack={true} 
          title={'Productos'}
          onRefresh={this.onRefresh.bind(this)}
        ></Topbar>
        <section className="o-section">
          <ProductList ref={this.products}></ProductList>
        </section>
      </div>
    );
  }

}

export default Products;
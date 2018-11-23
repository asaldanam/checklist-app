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
    console.log(this);
    return ( 
      <div className={`o-page ${this.props.history.action}`}>
        <Topbar
          history={this.props.history}
          displayBack={true} 
          title={'Productos'}
          searchbar={true}
          onRefresh={this.onRefresh.bind(this)}
        />
        <section className="o-section">
          <ProductList ref={this.products}/>
        </section>
      </div>
    );
  }

}

export default Products;
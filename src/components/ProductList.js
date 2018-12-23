

import React, { Component, Fragment } from 'react';
import Product from './Product';
import ProductSkeleton from './ProductSkeleton';
import { connect } from "react-redux";

const mapState = state => ({ 
  filter: state.filter,
  list: state.list
 });

class ProductList extends Component {

  constructor() {
    super();
    this.state = {
      loaded: false
    };
  };
  

  componentDidMount() {
    setTimeout(() => this.setState(() => ({loaded: true})), 500)
  }

  render() {
    const filteredList = this.filterList(this.props.list, this.props.filter)

    return (
      this.state.loaded ?
        <Fragment>
          {filteredList.map((item, index) => 
              <Product
                key={item.ref}
                delay={index * 35}
                display={item.filter}
                type={'products'}
                productId={item.ref}
              />
          )}
        </Fragment>
      :
        <Fragment>
          {Array(20).fill('').map((item, index) => 
            <ProductSkeleton key={index} />
          )}
        </Fragment>
    );
  }

  filterList(list, filterParam) {
    return list.map(product => product.name.includes(filterParam) ? {...product, filter: true } : {...product, filter: false })
  }
  
}

export default connect(mapState)(ProductList);
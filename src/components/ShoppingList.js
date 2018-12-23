

import React, { PureComponent } from 'react';
import Product from './Product';
import { connect } from "react-redux";
import ProductSkeleton from './ProductSkeleton';

const mapState = state => ({ 
  list: state.list
 });

class ShoppingList extends PureComponent {
  
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
    return ( 
      this.state.loaded ?
        this.props.list.length !== 0 ?
          <React.Fragment>
            {this.props.list
              .filter(item => item.onList === true)
              .map((item, index) => 
                <Product
                  delay={index * 35}
                  type={'shopping'}
                  key={item.ref}
                  productId={item.ref}
                />
              )}
          </React.Fragment>
        :
          <React.Fragment>
            0 Results
          </React.Fragment>
      :
        <React.Fragment>
          {Array(20).fill('').map((item, index) => 
            <ProductSkeleton key={index} />
          )}
        </React.Fragment>
    );
  }

}

export default connect(mapState)(ShoppingList);
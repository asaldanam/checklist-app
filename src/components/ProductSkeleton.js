import React, { PureComponent } from 'react';

class ProductSkeleton extends PureComponent {

  render() {
    return ( 
      <div className="c-product --skeleton">
        <div className="c-product-container">
          <div className="c-product-stateicon"></div>
          <div className="c-product-text"></div>
        </div>
      </div>
    );
  }
}

export default ProductSkeleton;
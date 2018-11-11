

import React, { Component } from 'react';
import fs from '../firestore';
import Product from './Product';

class ListItems extends Component {
  
  constructor() {
    super();
    this.state = {
      loaded: false,
      list: []
    };
  };

  componentDidMount() {
    fs.collection('products')
      .orderBy('name', 'asc')
      .onSnapshot(collection => {
        this.setState({
          loaded: true,
          list: collection.docs
        })
      });
  }

  handleCheck(productId) {
    const localDocState = this.state.list.filter(item => item.id === productId)[0].data().checked;
    fs.collection('products')
      .doc(productId)
      .update({'checked': !localDocState})
  }

  handleDelete(productId) {
    fs.collection('products')
      .doc(productId)
      .update({'onList': false})  
  }

  render() {
    if(this.state.loaded) {
      return ( 
        <div className="c-shoppinglist">
          {this.state.list.map((item) => 
            <Product
              onCheck={this.handleCheck.bind(this)}
              onDelete={this.handleDelete.bind(this)}
              key={item.id}
              productId={item.id}
              productData={item.data()}
              status={item.data().checked ? '--checked-opacity' : '--list'}
            >
            </Product>
          )}
        </div>
      );
    } else {
      return ( 
        <div className="o-section">
          skeleton...
        </div>
      );
    }
  }

  componentWillUnmount() {
    const unsubscribe = fs.collection('products').onSnapshot(() => {})
    unsubscribe();
  }
}

export default ListItems;


import React, { Component } from 'react';
import fs from '../firestore';
import Product from './Product';

class ShoppingList extends Component {
  
  constructor() {
    super();
    this.state = {
      loaded: false,
      list: []
    };
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    fs.collection('products')
      .where("onList", "==", true)
      .orderBy('name', 'asc')
      .onSnapshot(collection => {
        if(this._isMounted) {
          this.setState({
            loaded: true,
            list: collection.docs
          })
        }
      });
  }

  handleCheck(productId) {
    const localDocState = this.state.list.filter(item => item.id === productId)[0].data().checked;
    console.log(localDocState)
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
        <div className="o-list">
          {this.state.list.map((item) => 
            <Product
              onCheck={this.handleCheck.bind(this)}
              onDelete={this.handleDelete.bind(this)}
              key={item.id}
              productId={item.id}
              productData={item.data()}
              status={item.data().checked ? '--checked-opacity' : '--list'}
            />
          )}
        </div>
      );
    } else {
      return ( 
        <div className="o-section">
          sin resultados
        </div>
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    const unsubscribe = fs.collection('products').onSnapshot(() => {})
    unsubscribe();
  }
}

export default ShoppingList;
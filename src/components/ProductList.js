

import React, { Component } from 'react';
import fs from '../firestore';
import Product from './Product';

class ProductList extends Component {
  
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
    const localDocState = this.state.list.filter(item => item.id === productId)[0].data().onList;
    fs.collection('products')
      .doc(productId)
      .update({'onList': !localDocState, 'checked': false})
  }

  handleDelete(productId) {
    fs.collection('products')
      .doc(productId)
      .delete()
  }

  onRefresh() {
    const batch = fs.batch();
    fs.collection('products')
      .where('onList', '==', true)
      .get().then(items => {
        items.docs.forEach(doc => {
          batch.update(doc.ref, {'onList': false, 'checked': false})
        })
        batch.commit()
          .then(() => {console.log('El batch se ha realizado con éxito')})
          .catch(() => {console.error('Ha habido un error con el batch')})
      })
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
              status={item.data().onList ? '--checked' : '--plus-opacity'}
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
    this._isMounted = false;
    const unsubscribe = fs.collection('products').onSnapshot(() => {})
    unsubscribe();
  }
}

export default ProductList;
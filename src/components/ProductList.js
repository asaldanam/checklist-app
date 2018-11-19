

import React, { Component } from 'react';
import {db} from '../firestore';
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
    db.collection('products')
      .orderBy('name', 'asc')
      .onSnapshot(collection => {
        const list = collection.docs.map(doc => ({
          ref: doc.id,
          filter: true
        }))
        if(this._isMounted) {
          this.setState({
            loaded: true,
            list: list
          })
        }
      });
  }


  onRefresh() {
    const batch = db.batch();
    db.collection('products')
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
    console.log(this);
    if(this.state.loaded) {
      return ( 
        <div className="o-list">
          {this.state.list.map((item) => 
            <Product
              type={'products'}
              key={item.ref}
              productId={item.ref}
            />
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
    const unsubscribe = db.collection('products').onSnapshot(() => {})
    unsubscribe();
  }
}

export default ProductList;
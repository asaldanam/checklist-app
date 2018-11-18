

import React, { PureComponent } from 'react';
import fs from '../firestore';
import Product from './Product';

class ShoppingList extends PureComponent {
  
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
          const list = collection.docs.map(doc => ({
            ref: doc.id,
          }))

          this.setState({
            loaded: true,
            list: list
          })
        }
      });
  }

  handleDelete(productId) {
    fs.collection('products')
      .doc(productId)
      .update({'onList': false})  
  }

  render() {
    console.log(this.state);
    if(this.state.loaded) {
      return ( 
        <React.Fragment>
          {this.state.list.map((item) => 
            <Product
              type={'shopping'}
              key={item.ref}
              productId={item.ref}
            />
          )}
        </React.Fragment>
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


import React, { PureComponent } from 'react';
import {db} from '../firestore';
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
    db.collection('products')
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

  render() {
    console.log(this);
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
    const unsubscribe = db.collection('products').onSnapshot(() => {})
    unsubscribe();
  }
}

export default ShoppingList;
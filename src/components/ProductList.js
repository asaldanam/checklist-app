

import React, { Component } from 'react';
import {db} from '../firestore';
import Product from './Product';
import { connect } from "react-redux";

const mapState = state => ({ filter: state.filter });

class ProductList extends Component {
  
  constructor() {
    super();
    this.state = {
      loaded: false,
      list: []
    };
  };

  _isMounted = false;

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

  filterList(list, filterParam) {
    return list.map(product => product.name.includes(filterParam) ? {...product, filter: true } : {...product, filter: false })
  }

  componentDidMount() {
    this._isMounted = true;
    db.collection('products')
      .orderBy('name', 'asc')
      .onSnapshot(collection => {
        const list = collection.docs.map(doc => ({
          ref: doc.id,
          name: doc.data().name,
          filter: true
        }))
        if(this._isMounted) {
          this.setState(() => ({
            loaded: true,
            list: list
          }));
        }
      });
  }

  render() {
    const filteredList = this.filterList(this.state.list, this.props.filter)
    console.log(this);
    if(this.state.loaded) {
      return ( 
        <div className="o-list">
          {filteredList.map((item) => 
              <Product
                display={item.filter}
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

export default connect(mapState)(ProductList);
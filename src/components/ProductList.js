

import React, { PureComponent } from 'react';
import {db} from '../firestore';
import Product from './Product';
import { connect } from "react-redux";

const mapState = state => ({ filter: state.filter });

class ProductList extends PureComponent {
  
  constructor() {
    super();
    this.state = {
      loaded: false,
      list: []
    };
  };

  _isMounted = false;
  
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

    return ( 
    this.state.loaded ?
      <React.Fragment>
        {filteredList.map((item) => 
            <Product
              display={item.filter}
              type={'products'}
              key={item.ref}
              productId={item.ref}
            />
        )}
      </React.Fragment>
    :
      <React.Fragment>
        Loading....
      </React.Fragment>
    );
  }
 
  componentWillUnmount() {
    this._isMounted = false;
    const unsubscribe = db.collection('products').onSnapshot(() => {})
    unsubscribe();
  }
  
}

export default connect(mapState)(ProductList);
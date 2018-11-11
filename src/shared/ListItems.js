

import React, { Component } from 'react';
import fs from '../firestore';
import ListItem from './ListItem';

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

  render() {
    if(this.state.loaded) {
      return ( 
        <div className="c-listitems">
          {this.state.list.map((item) => 
            <ListItem
              key={item.id}
              docId={item.id}
              productData={item.data()}
            >
            </ListItem>
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
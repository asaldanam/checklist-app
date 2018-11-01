

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
        <section>
          {this.state.list.map((item) => 
            <ListItem
              key={item.id}
              docId={item.id}
              productData={item.data()}
            >
            </ListItem>
          )}
        </section>
      );
    } else {
      return ( 
        <section className="o-section">
          skeleton...
        </section>
      );
    }
  }

  componentWillUnmount() {
    const unsubscribe = fs.collection('products').onSnapshot(() => {})
    unsubscribe();
    console.log('call unsubscribe');
  }
}

export default ListItems;
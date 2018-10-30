import React, { Component } from 'react';
import fs from '../../firestore';

class ListItem extends Component {

  constructor() {
    super();
    this.state = {};
  };

  handleCheck() {
    console.log(this.props.docId);
    // fs.getCollection('products').doc(this.props.docId).onSnapshot(collection => {
    //   console.log(collection.data());
    // })
    fs.getCollection('products').doc(this.props.docId).update({'checked': !this.props.productData.checked})
  }

  render() {
    return ( 
      <div onClick={() => this.handleCheck()} className="c-list-item">
        <div className={ 'c-list-item-check ' + (this.props.productData.checked ? '--checked' : '') }>
          <div className="c-list-item-check-icon"></div>
        </div>
        <span className="g-item c-list-item-text">{this.props.productData.name}</span>
      </div>
    );
  }
}

export default ListItem;
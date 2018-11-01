import React, { Component } from 'react';
import fs from '../firestore';

class ListItem extends Component {

  constructor() {
    super();
    this.state = {
      checkState: ''
    };
  };
  componentDidMount() {
    this.setState({
      checkState: this.props.checkState
    })
  }

  handleCheck() {
    fs.collection('products')
      .doc(this.props.docId)
      .update({'checked': !this.props.productData.checked})
  }

  render() {
    return ( 
      <div
      onClick={() => this.handleCheck()}
      className={ `c-listitem --${this.props.productData.checked ? 'checked-opacity' : 'list'} `} 
      >
        <div className="c-listitem-stateicon">
          <div className="a"></div>
          <div className="b"></div>
        </div>
        <div className="c-listitem-text">
          <span> {this.props.productData.name} </span>
        </div>
      </div>
    );
  }
}

export default ListItem;
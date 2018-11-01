import React, { Component } from 'react';

// Components
import Topbar from '../shared/Topbar';
import ListItems from '../shared/ListItems';

class List extends Component {

  
  constructor() {
    super();
    this.state = {};
  };

  render() {
    console.log('render')
    return ( 
      <div className="o-page">
        <Topbar></Topbar>
        <ListItems></ListItems>
      </div>
    );
  }

}

export default List;
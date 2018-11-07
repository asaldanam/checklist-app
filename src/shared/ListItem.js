import React, { Component } from 'react';
import fs from '../firestore';
import Swipe from 'react-easy-swipe';

class ListItem extends Component {

  constructor() {
    super();
    this.state = {
      checkState: '',
    };
  };
  componentDidMount() {
    this.setState({
      checkState: this.props.checkState,
      deleted: false,
      swipePosition: 0,
      swipeEnabled: true,
      swipeAnimation: false
    })
  }

  handleCheck() {
    fs.collection('products')
      .doc(this.props.docId)
      .update({'checked': !this.props.productData.checked})
  }

  handleSwipeStart(event) {
    // this.setState({ 
    //   swipeAnimation: false
    // });   
  }

  handleSwipeEnd(event) {
    this.setState({  swipeEnabled: false, swipeAnimation: true,});
    this.state.swipePosition < -100 ? 
      this.setState({swipePosition: -window.innerWidth, deleted: true})
      : this.setState({swipePosition: 0,})

    setTimeout(() => {this.setState({ 
      swipeEnabled: true, 
      swipeAnimation: false,
    });}, 500 );
  }

  handleSwipeMove(position, event) {
    if (position.x < 0 && this.state.swipeEnabled) {
      this.setState({swipePosition: position.x})
    }
    console.log(this.state.swipePosition); 
  }

  render() {
    return ( 
      <Swipe
      onSwipeEnd={this.handleSwipeEnd.bind(this)}
      onSwipeStart={this.handleSwipeStart.bind(this)}
      onSwipeMove={this.handleSwipeMove.bind(this)}
      onClick={() => this.handleCheck()}
      className={ `c-listitem --${this.props.productData.checked ? 'checked-opacity' : 'list'} --${this.state.deleted ? 'deleted' : ''} `} 
      >
      <div
        className={`c-listitem-container ${this.state.swipeAnimation ? '--animation' : ''}`}
        style={{transform: `translateX(${this.state.swipePosition}px)`}}>

        <div className="c-listitem-stateicon">
          <div className="a"></div>
          <div className="b"></div>
        </div>
        <div className="c-listitem-text">
          <span> {this.props.productData.name} </span>
        </div>
      </div>
      </Swipe>
    );
  }
}

export default ListItem;
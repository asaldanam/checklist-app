import React, { Component } from 'react';
import fs from '../firestore';
import Swipe from 'react-easy-swipe';

class ListItem extends Component {

  constructor() {
    super();
    this.state = {
      checkState: '',
      deleted: false,
      swipePosition: 0,
      swipeEnabled: true,
      swipeAnimation: false,
      isSwipping: false
    };
  };

  componentDidMount() {
    this.setState({ checkState: this.props.checkState, })
  }

  handleCheck() {
    fs.collection('products')
      .doc(this.props.docId)
      .update({'checked': !this.props.productData.checked})
  }

  handleDelete() {
    fs.collection('products')
    .doc(this.props.docId)
    .update({'onList': false})  
  } 

  handleSwipeStart(event) {
    this.setState({ 
      isSwipping: true
    });   
  }

  handleSwipeMove(position, event) {
    if (position.x < -50 && this.state.swipeEnabled) {
      this.setState({swipePosition: position.x + 50})
    }
    console.log(this.state.swipePosition); 
  }

  handleSwipeEnd(event) {
    
    this.setState({  
      swipeEnabled: false,
      swipeAnimation: true,
      isSwipping: false
    });

    if (this.state.swipePosition < -150) {
      this.setState({swipePosition: -window.innerWidth, deleted: true})
      setTimeout(() => { this.handleDelete(); }, 500 );
    } else {
      this.setState({swipePosition: 0,})
    }

    setTimeout(() => {
      this.setState({ 
        swipeEnabled: true, 
        swipeAnimation: false,
      });
      }, 500 );
  }

  render() {

    //conditional className
    const listStateStyle = this.props.productData.checked ? '--checked-opacity' : '--list'
    const deletedStyle = this.state.deleted ? '--deleted' : ''
    const animationStyle = this.state.swipeAnimation ? '--animation' : '';
    const swippingStyle = this.state.isSwipping && this.state.swipePosition < 0 ? '--swipping' : '';
    //conditional style
    const positionStyle = { transform: `translateX(${this.state.swipePosition}px)` }

    return ( 
      <Swipe
      onSwipeStart={this.handleSwipeStart.bind(this)}
      onSwipeMove={this.handleSwipeMove.bind(this)}
      onSwipeEnd={this.handleSwipeEnd.bind(this)}
      onClick={() => this.handleCheck()}
      className={ `c-listitem ${listStateStyle} ${deletedStyle}`} >

      <div className={`c-listitem-wrapper ${animationStyle}`} style={positionStyle}>
        <div className={`c-listitem-container ${swippingStyle}`}>
          <div className="c-listitem-stateicon">
            <div className="a"></div>
            <div className="b"></div>
          </div>
          <div className="c-listitem-text">
            <span> {this.props.productData.name} </span>
          </div>
        </div>
        <div className="c-listitem-swipeactions">
          Eliminar
        </div>
      </div>
     
      </Swipe>
    );
  }
}

export default ListItem;
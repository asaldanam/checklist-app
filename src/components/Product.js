import React, { Component } from 'react';
import Swipe from 'react-easy-swipe';

class Product extends Component {

  constructor() {
    super();
    this.state = {
      deleted: false,
      swipePosition: 0,
      swipeEnabled: true,
      swipeAnimation: false,
      isSwipping: false
    };
  };
  

  deleteItem() {
    this.props.onDelete(this.props.productId);
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
  }

  handleSwipeEnd(event) {
    
    this.setState({  
      swipeEnabled: false,
      swipeAnimation: true,
      isSwipping: false
    });

    if (this.state.swipePosition < -125) {
      this.setState({swipePosition: -window.innerWidth, deleted: true})
      setTimeout(() => { this.deleteItem(); }, 500 );
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
    const deletedStyle = this.state.deleted ? '--deleted' : '';
    const animationStyle = this.state.swipeAnimation ? '--animation' : '';
    const swippingStyle = this.state.isSwipping && this.state.swipePosition < 0 ? '--swipping' : '';
    //conditional style
    const positionStyle = { transform: `translateX(${this.state.swipePosition}px)` }

    return ( 
      <Swipe
      onSwipeStart={this.handleSwipeStart.bind(this)}
      onSwipeMove={this.handleSwipeMove.bind(this)}
      onSwipeEnd={this.handleSwipeEnd.bind(this)}
      onClick={() => this.props.onCheck(this.props.productId)}
      className={ `c-product ${this.props.status} ${deletedStyle}`} >

      <div className={`c-product-wrapper ${animationStyle}`} style={positionStyle}>
        <div className={`c-product-container ${swippingStyle}`}>
          <div className="c-product-stateicon">
            <div className="a"></div>
            <div className="b"></div>
          </div>
          <div className="c-product-text">
            <span> {this.props.productData.name} </span>
          </div>
        </div>
        <div className="c-product-swipeactions">
          Eliminar
        </div>
      </div>
     
      </Swipe>
    );
  }
}

export default Product;
import React, { PureComponent } from 'react';
import Swipe from 'react-easy-swipe';
// import { connect } from "react-redux";
// import { switchItemCheckStatus } from './../redux';

import {fs, db } from '../firestore';

// const mapDispatch = dispatch => ({
//   switchItemCheckStatus: (checked, ref) => {
//     return dispatch(switchItemCheckStatus(checked, ref))
//   },
// });

class Product extends PureComponent {

  constructor() {
    super();
    this.state = {
      loaded: false,
      blockAnimation: false,
      deleted: false,
      swipePosition: 0,
      swipeEnabled: true,
      swipeAnimation: false,
      isSwipping: false,
      name: '',
      checked: false,
      onList: false
    };
  };

  _isMounted = false;

  componentDidMount(){
    this._isMounted = true;
      db.collection('products')
        .doc(this.props.productId)
        .onSnapshot(doc => {
          if (this._isMounted) {
            this.setState(() => ({
              loaded: true,
              name: doc.data().name,
              checked: doc.data().checked,
              onList: doc.data().onList,
            }));
          }
        })
  }

  render() {
    console.log(this.state.name, this.state)  
    const dyStyle = {
      blockAnimation: this.state.blockAnimation ? '--block-animation' : '', 
      // display: this.props.display ? null : {display: 'none'},
      styleProps: {
        // display: this.props.display ? null : 'none',
        animationDelay: this.props.delay + 'ms'
      },
      deleted: this.state.deleted ? '--deleted' : '',
      animation: this.state.swipeAnimation ? '--animation' : '',
      swipping: this.state.isSwipping && this.state.swipePosition < 0 ? '--swipping' : '',
      check: this.props.type === 'shopping' ? this.state.checked  ? '--checked-opacity' : '--list' : '',
      add: this.props.type === 'products' ? this.state.onList ? '--checked' : '--plus-opacity' : '',
      position: { transform: `translateX(${this.state.swipePosition}px)` }
    }

    return (
      this.state.loaded ? 
        <Swipe
        onSwipeStart={this.onSwipeStart}
        onSwipeMove={this.onSwipeMove}
        onSwipeEnd={this.onSwipeEnd}
        onClick={this.onTouch}
        className={ `c-product ${dyStyle.check} ${dyStyle.add} ${dyStyle.deleted} ${dyStyle.blockAnimation}`} style={dyStyle.styleProps}>
        <div className={`c-product-wrapper ${dyStyle.animation}`} style={dyStyle.position}>
          <div className={`c-product-container ${dyStyle.swipping}`}>
            <div className="c-product-stateicon">
              <div className="a"></div>
              <div className="b"></div>
            </div>
            <div className="c-product-text">
              <span> {this.state.name} </span>
            </div>
          </div>
          <div className="c-product-swipeactions">
            Eliminar
          </div>
        </div>
      
        </Swipe>
        : null
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
    const unsubscribe = db.collection('products').doc(this.props.productId).onSnapshot(() => {})
    unsubscribe();
  }

  onTouch = () => {

    if (this.props.type === 'shopping')
      // this.props.switchItemCheckStatus(!this.state.checked, this.props.productId)
      {fs.switchCheck(this.props.productId, !this.state.checked);}
    else if (this.props.type === 'products')
      {fs.switchAdd(this.props.productId, !this.state.onList);}
  }

  onSwipe = () => {
    // this.setState(() => ({blockAnimation: false}));
    if (this.props.type === 'shopping')
      {fs.switchAdd(this.props.productId, false);}
    else if (this.props.type === 'products')
      {fs.delete(this.props.productId)}
  }
  
  onSwipeStart = () => {
    if (this.state.swipePosition < -3) {
      this.setState(() => ({ isSwipping: true}));
    }  
  }

  onSwipeMove = (position) => {
    if (position.x < -50 && this.state.swipeEnabled) {
      this.setState(() => ({swipePosition: position.x + 50}))
    }
  }

  onSwipeEnd = () => {

    if (this.state.swipePosition < -3) {
      this.setState(() => ({  
        swipeEnabled: false,
        swipeAnimation: true,
        isSwipping: false
      }));
  
      setTimeout(() => {
        this.setState(() => ({ 
          swipeEnabled: true, 
          swipeAnimation: false,
        }));
        }, 500 );
    }
  
    if (this.state.swipePosition < -125) {
      this.setState(() => ({swipePosition: -window.innerWidth, deleted: true}));
      setTimeout(() => { this.onSwipe(); }, 500 );
    } else {
      this.setState(() => ({swipePosition: 0,}));
    }
  }
}

export default Product;
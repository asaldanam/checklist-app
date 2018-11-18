import React, { PureComponent } from 'react';
import Swipe from 'react-easy-swipe';
import fs from '../firestore';


class Product extends PureComponent {

  constructor() {
    super();
    this.state = {
      deleted: false,
      swipePosition: 0,
      swipeEnabled: true,
      swipeAnimation: false,
      isSwipping: false,
      name: '',
      checked: false
    };
  };

  onSwipe() {
    console.log('deleted!');
    // this.props.onDelete(this.props.productId);
  } 

  onTouch() {
    const productId = this.props.productId
    fs.collection('products')
      .doc(productId)
      .update({'checked': !this.state.checked})
  }

  onSwipeStart() {
    if (this.state.swipePosition < -3) {
      this.setState({ isSwipping: true});
    }  
  }

  onSwipeMove(position) {
    if (position.x < -50 && this.state.swipeEnabled) {
      this.setState({swipePosition: position.x + 50})
    }
  }

  onSwipeEnd() {

    if (this.state.swipePosition < -3) {
      this.setState({  
        swipeEnabled: false,
        swipeAnimation: true,
        isSwipping: false
      });
  
      setTimeout(() => {
        this.setState({ 
          swipeEnabled: true, 
          swipeAnimation: false,
        });
        }, 500 );
    }
  
    if (this.state.swipePosition < -125) {
      this.setState({swipePosition: -window.innerWidth, deleted: true})
      setTimeout(() => { this.onSwipe(); }, 500 );
    } else {
      this.setState({swipePosition: 0,})
    }
  }

  componentDidMount(){
    fs.collection('products')
      .doc(this.props.productId)
      .onSnapshot(doc => {
        this.setState({
          name: doc.data().name,
          checked: doc.data().checked
        });
      })
  }

  render() {
    

    const style = {
      deleted: this.state.deleted ? '--deleted' : '',
      animation: this.state.swipeAnimation ? '--animation' : '',
      swipping: this.state.isSwipping && this.state.swipePosition < 0 ? '--swipping' : '',
      check: this.props.type === 'shopping' ? this.state.checked ? '--checked-opacity' : '--list' : '',
      add: this.props.type === 'products' ? this.state.onList ? '--checked' : '--plus-opacity' : '',
      position: { transform: `translateX(${this.state.swipePosition}px)` }
    }

    console.log(this.state);

    return ( 
      <Swipe
      onSwipeStart={this.onSwipeStart.bind(this)}
      onSwipeMove={this.onSwipeMove.bind(this)}
      onSwipeEnd={this.onSwipeEnd.bind(this)}
      onClick={() => this.onTouch()}
      className={ `c-product ${style.check} ${style.add} ${style.deleted}`} >
      <div className={`c-product-wrapper ${style.animation}`} style={style.position}>
        <div className={`c-product-container ${style.swipping}`}>
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
    );
  }
}

export default Product;
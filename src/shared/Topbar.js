import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

// Images
import iconProducts from '../assets/icon/products.svg';
import iconBack from '../assets/icon/back.svg';

class Tobbar extends Component {

  constructor() {
    super();
    this.state = {
      // scrollPosition: 0,
      // scrollDirection: 'up'
    };
  };

  // handleScroll(event) {
  //   window.scrollY > this.state.scrollPosition ?
  //     this.setState({ scrollDirection: 'down' })
  //     : this.setState({ scrollDirection: 'up' })

  //   this.setState({ scrollPosition: window.scrollY });

  //   console.log(this.state.scrollDirection);
  // }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll.bind(this));
  // }


  render() {
    // const isTopStyle = this.state.scrollPosition > 0 ? '--scrolled': '';
    // const scrollDirectionStyle = '--' + this.state.scrollDirection;

    return ( 
      <div className="c-topbar">
        <header className={`c-topbar-container`}>
          {this.props.displayBack ? 
          <div onClick={() => {this.props.history.goBack()}}className="c-topbar-iconback">
            <img src= {iconBack} alt=""/>
          </div>
          : null}
          <div className="c-topbar-title">{this.props.title}</div>
          <div className="c-topbar-iconwrapper">
            {this.props.displayProducts ? 
            <Link to="/products">
              <div><img src= {iconProducts} alt=""/></div>
            </Link>
            : null}
          </div>
        </header>
      </div>
    );
  }
}

export default Tobbar;
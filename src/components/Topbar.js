import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

//Components
import Searchbar from './Searchbar';

// Images
import iconAdd from '../assets/icon/add.svg';
import iconProducts from '../assets/icon/products.svg';
import iconBack from '../assets/icon/back.svg';
import iconRefresh from '../assets/icon/refresh.svg';

class Tobbar extends PureComponent {

  constructor() {
    super();
    this.state = {
      scrollPosition: 0,
      scrollDirection: 'up'
    };
  };

  handleScroll(event) {
    window.scrollY > this.state.scrollPosition ?
      this.setState({ scrollDirection: 'down' })
      : this.setState({ scrollDirection: 'up' })

    this.setState({ scrollPosition: window.scrollY });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }


  render() {
    const isTopStyle = this.state.scrollPosition > 0 ? '--scrolled': '';
    const scrollDirectionStyle = '--' + this.state.scrollDirection;
    const hasSearchbar = this.props.searchbar
    const searchbarPadding = hasSearchbar ? '--searchbar' : '';

    return ( 
      <nav className={`c-topbar ${searchbarPadding}`}>
        <div className={`c-topbar-container ${isTopStyle}`}>
          <div className="c-topbar-bar">
            {this.props.displayBack ? 
            <div onClick={() => {this.props.history.goBack()}}className="c-topbar-iconback">
              <img src= {iconBack} alt=""/>
            </div>
            : null}
            <div className="c-topbar-title">{this.props.title}</div>
            <div className="c-topbar-iconwrapper">
              {this.props.onRefresh ? 
                <div onClick={() => this.props.onRefresh()}>
                  <img src= {iconRefresh} alt=""/>
                </div>
              : null}
              {this.props.displayNewProduct ?
                <Link to="/new-product">
                  <div><img src= {iconAdd} alt=""/></div>
                </Link>                
              : null}
              {this.props.displayProducts ? 
                <Link to="/products">
                  <div><img src= {iconProducts} alt=""/></div>
                </Link>
              : null}
            </div>
          </div>

          {hasSearchbar ? 
            <Searchbar/>
          : null }

        </div>
      </nav>
    );
  }
}

export default Tobbar;
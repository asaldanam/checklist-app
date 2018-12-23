import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { getProductsThunk } from './redux';
import { connect } from "react-redux";

import './App.css';

// Pages
import Shopping from './pages/Shopping.js';
import Products from './pages/Products.js';
import NewProduct from './pages/Newproduct.js';

const mapDispatch = dispatch => ({
  getProductsThunk: () => dispatch(getProductsThunk())
});

function Container ({location}) {
  return (
    <TransitionGroup className={`o-app`}>
      <CSSTransition key={location.key} timeout={{ enter: 450, exit: 450 }} classNames={'fade'}>
        <Switch location={location}>
          <Route path="/" exact component={Shopping} />
          <Route path="/products" exact component={Products} />
          <Route path="/new-product" exact component={NewProduct} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

const ContainerWithRouter = withRouter(Container);

class App extends Component {

  constructor() {
    super();
    this.state = {
      scrollPosition: 0,
      scrollDirection: 'up'
    };
  };

  componentDidMount() {
    this.props.getProductsThunk();
  }
  
  render() {
    return (
      <Router>
        <ContainerWithRouter></ContainerWithRouter>
      </Router>
    );
  }
}

export default connect(null, mapDispatch)(App);

// export default App;

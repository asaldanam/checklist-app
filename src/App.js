import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory"
import { TransitionGroup, CSSTransition } from "react-transition-group";

import './App.css';

// Pages
import List from './pages/List.js';
import Products from './pages/Products.js';

function Container ({location}) {

  return (
    <TransitionGroup className={`o-app`}>
      <CSSTransition key={location.key} timeout={{ enter: 750, exit: 750 }} classNames={'fade'}>
        <Switch location={location}>
          <Route path="/" exact component={List} />
          <Route path="/products" exact component={Products} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

const ContainerWithRouter = withRouter(Container);

class App extends Component {

  constructor() {
    super();
    this.state = {};
  };
  
  render() {
    return (
      <Router>
        <ContainerWithRouter></ContainerWithRouter>
      </Router>
    );
  }
}



export default App;

// export default App;

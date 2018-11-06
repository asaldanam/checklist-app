import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';

// Pages
import List from './pages/List.js';
import Products from './pages/Products.js';
import Topbar from './shared/Topbar.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      route: '--list'
    };
  };


  handleScroll() {
    const wrapper = this.wrapper.current;
    console.log(wrapper.scrollTop)
  }
  
  render() {

    return (
      <main className="o-app-wrapper">
        <Router>
          <div>
            <Route path="/" exact component={List} />
            <Route path="/products" exact component={Products} />
          </div>
        </Router>
      </main>
    );
  }
}

export default App;

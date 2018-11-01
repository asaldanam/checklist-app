import React, { Component } from 'react';
import './App.css';

// Pages
import List from './pages/List.js';

class App extends Component {

  constructor() {
    super();
    this.state = {};
  };

  render() {
    return (
      <main className="o-app-wrapper">
        <List></List>
      </main>
    );
  }
}

export default App;

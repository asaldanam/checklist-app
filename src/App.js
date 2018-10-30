import React, { Component } from 'react';
import './App.css';

// Pages
import List from './pages/list/List.js';

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

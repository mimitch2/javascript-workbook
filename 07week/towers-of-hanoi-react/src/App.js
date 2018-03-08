import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <div data-stack="1">
          <div data-block="100"></div>
          <div data-block="75"></div>
          <div data-block="50"></div>
          <div data-block="25"></div>
        </div>
        <div data-stack="2">
        </div>
        <div data-stack="3">
        </div>
      </div>
    );
  }
}

export default App;

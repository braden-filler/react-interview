import React, { Component } from 'react';
import DateSelect from './components/date-component';
import DisplayEvents from './components/all-events-component';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="main-container">
          <DateSelect />
        </div>
      </div>
    );
  }
}

export default App;

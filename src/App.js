import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyHeader from './components/Header'
import MyContent from './components/Content'
import MyFooter from './components/Footer'

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
          <MyHeader></MyHeader>
          <MyContent></MyContent>
          <MyFooter></MyFooter>
        </div>
      </Router>
    );
  }
}

export default App;

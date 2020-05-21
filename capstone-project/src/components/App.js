import React from 'react';
import './App.css';
import Header from './Header';
import ItemListControl from './ItemListControl'
import About from './About'
import { BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Route exact path="/" component={ItemListControl} />
        <Route exact path="/about" component={About} />
      </div>
    </Router>
  );
}

export default App;

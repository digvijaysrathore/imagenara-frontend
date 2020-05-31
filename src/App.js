import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Main from "./views/main";
import NavComponent from "./components/nav";
import Category from './views/category';
import Saved from './views/saved';

class App extends Component {
  render(){
    return (
      <div className="app">
        <BrowserRouter>
          <NavComponent />
          <Route path="/" exact component={Main}/>
          <Route path="/saved" component={Saved} />
          <Route path="/category/:category" component={Category} />
        </BrowserRouter>
      </div>
    )
  }
};

export default App;

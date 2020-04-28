import React from 'react';
import {BrowserRouter as Router, Route, Switch, HashRouter} from "react-router-dom"

import './App.css';

import Header from "../components/Header"
import Developer from "../components/DeveloperInfo"
import Developer2 from "../components/DeveloperInfo2"
import OpenSource from "../components/OpenSource"
import Newsletter from "../components/Newsletter"
import Products from "../components/Products"

import OpenStartup from "../pages/OpenStartup"
import AddYourStartup from "../pages/AddYourStartup"
import NotFound from "../pages/NotFound"

function App() {
  return (
    <HashRouter basename='/'>
      <Router>
        <div>
          <OpenSource/>
          <Header/>
          <Newsletter />
          <Developer/>
          <Developer2/>
          <Switch>
            <Route exact path="/" component={Products}/>
            <Route exact path="/acik-girisim"><OpenStartup/></Route>
            <Route exact path="/girisimini-ekle"><AddYourStartup/></Route>
            <Route>
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </Router>
    </HashRouter>
  );
}

export default App;

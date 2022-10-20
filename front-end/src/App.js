import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Header from './components/Header/Headers'
import './components/Header/Headers'
import EditComs from './components/EditComs/EditComs'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
      <Route exact path="/" component={Home}/>

      <Route exact path="/survey" component={Survey}/>
        <Route exact path="/edit" component={EditComs} />

        <Route exact path="/contact" component={Contact} />

    </Switch>
  </Router>
  );
}

export default App;

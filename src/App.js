import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'

import './css/App.css'

import Grid from './components/Grid'
import AltGrid from './components/AltGrid'
import Rules from './components/Rules'

class App extends React.Component {
 
  render() {
    return (
      <>
       <header>
         <h1>HoneyBee's Game of Life</h1>
         <nav>
           <Link to='/traditional'>Traditional Grid</Link>
           <Link to='/hexagon'>Hexagonal Grid</Link>
           <Link to='/'>Home</Link>
         </nav>
       </header>
       <div className='game'>
         <Switch>
           <Route path='/traditional' component={Grid} />
           <Route path='/hexagon' component={AltGrid} />
           <Route exact path='/' component={Rules} />
         </Switch>
        {/* <div className='row'>
          <Grid />
        </div>
        <div className="row">
        <Rules />
        </div> */}
       </div>
      </>
    );
  }
};

export default App;
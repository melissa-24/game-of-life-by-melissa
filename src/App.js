import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'

import './css/App.css'

import Grid25x25 from './components/grids/Grid25x25'
import Grid25x25Colors from './components/grids/Grid25x25Colors'
import Grid40x25 from './components/grids/Grid40x25'
import HexGrid from './components/grids/HexGrid'
import Rules from './components/Rules'

class App extends React.Component {
 
  render() {
    return (
      <>
       <header>
         <h1>HoneyBee's Game of Life</h1>
         <nav>
           <Link to='/'>Home</Link>
         </nav>
       </header>
       <div className='game'>
         <Switch>
           <Route path='/version1' component={Grid25x25} />
           <Route path='/version2' component={Grid25x25Colors} />
           <Route path='/version3' component={Grid40x25} />
           <Route path='/version4' component={HexGrid} />
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
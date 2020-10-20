import React from 'react'

import './css/App.css'

import Grid from './components/Grid'
import Rules from './components/Rules'

class App extends React.Component {
 
  render() {
    return (
      <>
       <header>
         <h1>HoneyBee's Game of Life</h1>
         <nav>
         </nav>
       </header>
       <div className='game'>
        <div className='row'>
          <Grid />
        </div>
        <div className="row">
        <Rules />
         
        </div>
       </div>
      </>
    );
  }
};

export default App;
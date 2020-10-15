import React from 'react'

import './css/App.css'

import Grid from './components/Grid'
import Rules from './components/Rules'
import Controls from './components/Controls'

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
          <Rules />
        </div>
        <div className="row">
          <Controls />
        </div>
       </div>
      </>
    );
  }
};

export default App;
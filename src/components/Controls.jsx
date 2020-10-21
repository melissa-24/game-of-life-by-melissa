import React, { useState } from 'react'

const Controls = () => {

    const [begin, setBegin] = useState(false)
    const [generations, setGenerations] = useState(0)

    const beginGame = () => {

    }

    const endGame = () => {

    }

    const nextGen = () => {
        
    }

    const clearGrid = () => {
        // if (className = "bgAlive") {
        //     return className = "bgDead"
        // }
    }

    return (
        <div className='controls'>
            <div className='button'><span>Start</span></div>
            <div className='button'><span>Pause</span></div>
            <div className='button'><span>Next</span></div>
            <div className='button' onclick={clearGrid}><span>Reset</span></div>
            {/* <div className='button'><span>Random Pattern</span></div> */}
      </div>
    )
}

export default Controls
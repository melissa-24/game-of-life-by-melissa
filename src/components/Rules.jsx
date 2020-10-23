import React from 'react'
import { Link } from 'react-router-dom'

const Rules = () => {
    return (
        <div className='home'>
            <div className='choices'>
                <h2>Welcome to my version's of the Game of Life.</h2>
                <h3>Chose a link below to see different versions</h3>
                <nav>
                    <Link to="/version1">25 X 25 Grid</Link>
                    <Link to='/version2'>25 X 25 Grid With Colors</Link>
                    <Link to='/version3'>40 x 25 Grid</Link>
                    <Link to='/version4'>Hexagonal Grid ** Under Construction</Link>
                </nav>
            </div>
            <div className='about'>
                <h2>About the Game of Life</h2>
                <p>A cellular automaton zero player game devised by the British mathematician John Horton Conway in 1970</p>
            </div>
            <div className='rules'>
            <h2>
                The Rules
            </h2>
                <ul>
                    <li>
                    Living cells that have two or three neighbors will remain alive in the
                    next generation.
                    </li>
                    <li>
                    Living cells with less than two neighbors will die due to
                    under-population.
                    </li>
                    <li>
                    Living cells with more than three neighbors will die due to
                    overpopulation.
                    </li>
                    <li>
                    Cells that are not alive, but have three living neighbors will be
                    brought to life due to reproduction.
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Rules
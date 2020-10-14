import React from 'react'

import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid'

class Grid extends React.Component {
    render() {
        const hexagons = GridGenerator.parallelogram(-2, 3, -2, 1)
        return (
            <>
            <p>Grid section</p>
            <HexGrid width={1200} height={1000}>
                <Layout size={{ x: 7, y: 7}}>
                    { hexagons.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} />)}
                </Layout>
            </HexGrid>
            </>
        )
    }
}

export default Grid
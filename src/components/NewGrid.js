import React, { Component } from "react";
import {
  GridGenerator,
  HexGrid,
  Layout,
  Pattern,
  Hexagon,
  HexUtils
} from "react-hexgrid";

class Grid extends Component {
  constructor(props) {
    super(props);
    const hexagons = GridGenerator.hexagon(4);

    // Set additional data for hexagons
    hexagons.forEach(hex => {
      hex.pattern = "bgDead";
    });

    this.state = {
      hexagons
    };
  }

  onClick(event, source) {
    // Get our hexagon data
    const { hexagons } = this.state;

    // Go through all of our hexagons and update patterns
    const hexas = hexagons.map(hex => {
      // Switch pattern only for the hexagon that was clicked
      if (HexUtils.equals(source.state.hex, hex)) {
        // Assign new pattern to _our_ data
        hex.pattern =
          source.props.fill === "bgDead" ? "bgAlive" : "bgDead";
      }

      return hex;
    });

    // Save our new hexagon data to the state, which will cause a re-render
    this.setState({ hexagons: hexas });
  }

  render() {
    let { hexagons } = this.state;
    return (
      <div className="the-grid">
        <h2>Hexagon Pattern Swap</h2>
        <p>Click a tile to swap it's pattern</p>
        <HexGrid width={1000} height={800}>
          <Layout
            size={{ x: 2, y: 2 }}
            flat={false}
            spacing={1.02}
            origin={{ x: -45, y: -40 }}
            map={'rectangle'}
            mapProps={[25, 25]}
          >
            {hexagons.map((hex, i) => (
              <Hexagon
                key={i}
                q={hex.q}
                r={hex.r}
                s={hex.s}
                /* Here we pass the pattern which we want to display */
                fill={hex.pattern}
                /* onClick event gets back 2 properties: event and source (hexagon) */
                onClick={(e, h) => this.onClick(e, h)}
              >
              </Hexagon>
            ))}
            <Pattern className="bgDead" />
            <Pattern className="bgAlive" />
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default Grid;

import React from 'react'
import { HexGrid, Layout, Hexagon, HexUtils, Pattern, GridGenerator } from 'react-hexgrid';
import configs from './config.json'


class Grid extends React.Component {
    constructor(props) {
      super(props);
      const config = configs['rectangle'];
      const generator = GridGenerator.getGenerator(config.map);
      const hexagons = generator.apply(this, config.mapProps);
      // lets loop over the hexagons and set the classAlive and isAlive properties for overkill (use either however you feel)
      hexagons.forEach(hex => {
        hex.classAlive = "bgDead";
        hex.isAlive = false;
      });

      this.state = { hexagons, config, dead: true }; 
    }
    
    // changeColor() {
    //   this.setState({dead: !this.state.dead})
    // }
    
    changeColor(event, source) {
      // Get our hexagon data
      const { hexagons } = this.state;

      // Go through all of our hexagons and update classAlive and isAlive
      var hexas = hexagons.map(hex => {
        // Switch classAlive and isAlive only for the hexagon that was clicked
        if (HexUtils.equals(source.state.hex, hex)) {
          // Assign new classAlive to _our_ data
          hex.classAlive = hex.classAlive === "bgDead" ? "bgAlive" : "bgDead";
          // toggle the isAlive
          hex.isAlive = !hex.isAlive;
        }

        // set the new state of the hexagons
        this.setState({ hexas });

        // return the hexagons for good measure
        return hexas;
      });
    }


    render() {
        const { hexagons, config } = this.state;
        const layout = config.layout;
        const size = { x: layout.width, y: layout.height };
        // const toggle = this.state.dead ? "bgDead" : "bgAlive";
        return (
            <>
              <p>Game Board Grid</p>
              <div className="the-grid">
                <HexGrid width={config.width} height={config.height}>
                  <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
                  {hexagons.map((hex, i) => (
                        <Hexagon key={config.mapProps + i} q={hex.q} r={hex.r} s={hex.s} className={ this.state.hexagons[i].classAlive } onClick={(e, h) => this.changeColor(e, h)} />
                      ))
                  }
                  </Layout>
                </HexGrid>
              </div>
            </>
        )
    }
}

export default Grid
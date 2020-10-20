import React from 'react'
import { HexGrid, Layout, Hexagon, GridGenerator, HexUtils } from 'react-hexgrid';
import configs from './config.json'


class Grid extends React.Component {
    constructor(props) {
        super(props);
        const config = configs['rectangle'];
        const generator = GridGenerator.getGenerator(config.map);
        const hexagons = generator.apply(this, config.mapProps);
        // this.state = { hexagons, config };
        hexagons.forEach(hex => {
          hex.classAlive = "bgDead";
          hex.isAlive = false;
        });
        this.state = { hexagons, config, dead: true}
        console.log(hexagons)
      }
    
      changeColor(event, source) {
        // this.setState({dead: !this.state.dead})
        const { hexagons } = this.state;
        var cells = hexagons.map(hex => {
          if (HexUtils.equals(source.state.hex, hex)) {
            hex.classAlive = hex.classAlive === "bgDead" ? "bgAlive" : "bgDead";
            hex.isAlive = !hex.isAlive;
          }
          this.setState({ cells });
          return cells;
        })
      }

    render() {
        const { hexagons, config } = this.state;
        const layout = config.layout;
        const size = { x: layout.width, y: layout.height };
        // let toggle = this.state.dead ? "bgAlive" : "bgDead";


        return (
            <>
            <div className="the-grid">
              <HexGrid width={config.width} height={config.height}>
                <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
                  { hexagons.map((hex, i) => (
                      <Hexagon key={config.mapProps + i} q={hex.q} r={hex.r} s={hex.s} className={ this.state.hexagons[i].classAlive } onClick={(e, h) => this.changeColor(e, h)} />
                    ))
                  }
                </Layout>
              </HexGrid>
            </div>
              <div className='controls'>
              <div className='button'><span>Start</span></div>
              <div className='button'><span>Pause</span></div>
              <div className='button'><span>Next</span></div>
              <div className='button'><span>Reset</span></div>
              <div className='button'><span>Random Pattern</span></div>
            </div>
            </>
        )
    }
}

export default Grid
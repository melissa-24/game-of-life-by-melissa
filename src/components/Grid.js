import React from 'react'
import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils } from 'react-hexgrid';
import configs from './config.json'


class Grid extends React.Component {
    constructor(props) {
        super(props);
        const config = configs['rectangle'];
        const generator = GridGenerator.getGenerator(config.map);
        const hexagons = generator.apply(this, config.mapProps);
        this.state = { hexagons, config, dead: true }; 
      }
    
      changeType(event) {
        const name = event.currentTarget.value;
        const config = configs[name];
        const generator = GridGenerator.getGenerator(config.map);
        const hexagons = generator.apply(this, config.mapProps);
        this.setState({ hexagons, config });
      }
      changeColor() {
          this.setState({dead: !this.state.dead})
      }

    render() {
        const { hexagons, config } = this.state;
        const layout = config.layout;
        const size = { x: layout.width, y: layout.height };
        let toggle = this.state.dead ? "bgAlive" : "bgDead";

        return (
            <>
            <p>Game Board Grid</p>
            <div className="grid">
            <HexGrid width={config.width} height={config.height}>
          <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
            {
              hexagons.map((hex, i) => (
                <Hexagon key={config.mapProps + i} q={hex.q} r={hex.r} s={hex.s}>
                    <Text className={toggle} onClick={this.changeColor.bind(this)} />
                </Hexagon>
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
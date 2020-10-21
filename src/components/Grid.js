import React from 'react'

const cellSize = 20;
const w = 600;
const h = 500;


class Cell extends React.Component {

    render() {
        const { x, y } = this.props;
        return (
            <div className="the-cell" style={{
                left: `${cellSize * x + 1}px`,
                top: `${cellSize * y + 1}px`,
                width: `${cellSize - 1}px`,
                height: `${cellSize - 1}px`,
            }} />
        );
    }
}
class Grid extends React.Component {

    constructor() {
        super();
        this.rows = h / cellSize;
        this.cols = w / cellSize;
        this.grid = this.makeEmptyGrid();
    }

    state = {
        cells: [],
        isRunning: false,
        interval: 100,
    }

    makeEmptyGrid() {
        let grid = [];
        for (let y = 0; y < this.rows; y++) {
            grid[y] = [];
            for (let x = 0; x < this.cols; x++) {
                grid[y][x] = false;
            }
        }
        return grid;
    }

    getElementOffset() {
        const rect = this.gridRef.getBoundingClientRect();
        const doc = document.documentElement;
        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.grid[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells;
    }

    handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        const x = Math.floor(offsetX / cellSize);
        const y = Math.floor(offsetY / cellSize);
        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.grid[y][x] = !this.grid[y][x];
        }
        this.setState({ cells: this.makeCells() });
    }

    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }

    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    runIteration() {
        let newGrid = this.makeEmptyGrid();
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.calculateNeighbors(this.grid, x, y);
                if (this.grid[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newGrid[y][x] = true;
                    } else {
                        newGrid[y][x] = false;
                    }
                } else {
                    if (!this.grid[y][x] && neighbors === 3) {
                        newGrid[y][x] = true;
                    }
                }
            }
        }
        this.grid = newGrid;
        this.setState({ cells: this.makeCells() });
        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }
    
    calculateNeighbors(grid, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];
            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && grid[y1][x1]) {
                neighbors++;
            }
        }
        return neighbors;
    }

    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
    }

    handleClear = () => {
        this.grid = this.makeEmptyGrid();
        this.setState({ cells: this.makeCells() });
    }

    handleRandom = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.grid[y][x] = (Math.random() >= 0.5);
            }
        }
        this.setState({ cells: this.makeCells() });
    }


    render() {
        const { cells, interval, isRunning } = this.state;

        return (
            <>
            <div className="the-grid"
                    style={{
                        width: w,
                        height: h,
                        backgroundSize: `${cellSize}px ${cellSize}px`
                    }}
                    onClick={this.handleClick}
                    ref={(n) => { this.gridRef = n; }}>

                    {cells.map(cell => (
                        <Cell
                            x={cell.x}
                            y={cell.y}
                            key={`${cell.x},${cell.y}`}/>
                    ))}
                </div>

                <div className="the-controls">
                    <p>Update every</p>
                    <input value={this.state.interval} onChange={this.handleIntervalChange} />
                    <p>msec</p>
                    {isRunning ?
                        <button className="button" onClick={this.stopGame}>Stop</button> :
                        <button className="button" onClick={this.runGame}>Run</button>
                    }
                    <button className="button" onClick={this.handleRandom}>Random</button>
                    <button className="button" onClick={this.handleClear}>Clear</button>
                </div>
            </>
        )
    }
}

export default Grid
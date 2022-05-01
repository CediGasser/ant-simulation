import Obstacle from './Obstacle'
import Constants from './Constants'
import type p5 from 'p5'

export default class World {
    gridX: number;
    gridY: number;
    grid: Array<Array<Obstacle>>;
    adjPos: Array<Array<Array<p5.Vector>>>;
    p5: p5;

    constructor(
        p5: p5,
        initValues = {
            gridX: Constants.GRID_W,
            gridY: Constants.GRID_H,
            obstacleCount: Constants.OBSTACLE_COUNT,
        }
    ) {
      const { gridX, gridY, obstacleCount} =
        initValues;
      this.gridX = gridX;
      this.gridY = gridY;
      this.p5 = p5;
      this.grid = this.initGrid();
      this.addObstacles(obstacleCount);
      this.renderAllOnce();
    }

    initGrid(): Array<Array<Obstacle>> {
      const grid = [];
      for (let x = 0; x < this.gridX; x++) {
        grid.push([]);
      }

      return grid;
    }

    addObstacles(quantity: number) {
      while (quantity--) {
        let x = Math.floor(Math.random() * this.gridX);
        let y = Math.floor(Math.random() * this.gridY);
        let expansions = Constants.OBSTACLE_SIZE;
        do {
          this.grid[x][y].createObstacle(this);
          this.adjPos[x][y].forEach((position: p5.Vector) => {
            if (this.grid[position.x][position.y].type != "Nest")
              this.grid[position.x][position.y] = new Obstacle(
                position.x,
                position.y
              );
          }, this);
          const nextPos = this.p5.random(this.adjPos[x][y]);
          x = nextPos.x;
          y = nextPos.y;
        } while (expansions--);
      }
    }

    update() {
        for (let x = 0; x < this.gridX; x++)
            for (let y = 0; y < this.gridY; y++) this.grid[x][y].update();
    }

    renderAllOnce() {
      for (let x = 0; x < this.gridX; x++)
        for (let y = 0; y < this.gridY; y++) this.grid[x][y].render(this.p5);
    }

    render() {
        // Obstacles aren't rendered
        for (let x = 0; x < this.gridX; x++)
            for (let y = 0; y < this.gridY; y++)
                if (this.grid[x][y].type != "Obstacle") this.grid[x][y].render(this.p5);
    }
}

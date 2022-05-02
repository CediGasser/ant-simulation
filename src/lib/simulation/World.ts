import Cell from './Cell'
import Nest from './Nest'
import Food from './Food'
import Obstacle from './Obstacle'
import Ant from './Ant'
import Constants from './Constants'
import p5 from 'p5'

export default class World {
    gridX: number;
    gridY: number;
    grid: Array<Array<Obstacle | Nest | Food | Cell>>;
    nest: Nest;
    adjPos: Array<Array<Array<p5.Vector>>>;
    ants: Array<Ant>;
    p5: p5;

    constructor(
        p5: p5,
        initValues = {
            gridX: Constants.GRID_W,
            gridY: Constants.GRID_H,
            obstacleCount: Constants.OBSTACLE_COUNT,
            ants: Constants.ANTS,
            nestX: Constants.NEST_X,
            nestY: Constants.NEST_Y,
            food: Constants.FOOD,
        }
    ) {
      const { gridX, gridY, obstacleCount, ants, nestX, nestY, food } =
        initValues;
      this.gridX = gridX;
      this.gridY = gridY;
      this.p5 = p5;
      this.grid = this.initGrid();
      this.nest = this.initNest(nestX, nestY);
      this.adjPos = this.getAdjPositions();
      this.addObstacles(obstacleCount);
      if (food) this.initFood(food);
      
      this.adjPos = this.getAdjPositions();
      this.ants = this.initAnts(ants);
      this.renderAllOnce();
    }

    initGrid(): Array<Array<Obstacle | Nest | Food | Cell>> {
      const grid = [];
      for (let x = 0; x < this.gridX; x++) {  // for each column
        grid.push([]);
        for (let y = 0; y < this.gridY; y++) grid[x][y] = new Cell(x, y, this);  // for each cell
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

    getAdjPositions(): Array<Array<Array<p5.Vector>>> {
      const adjPos: Array<Array<Array<p5.Vector>>> = [];
      for (let x = 0; x < this.gridX; x++) {
        adjPos.push([]);
        for (let y = 0; y < this.gridY; y++) {
          const neighbours = this.getNeighbours(x, y);
          adjPos[x][y] = [];
          neighbours.forEach((position) => {
            try {
              const cell = this.grid[position.x][position.y];
              if (cell.type != "Obstacle") adjPos[x][y].push(position);
            } catch (error) {
              if (!(error instanceof TypeError)) throw error;
            }
          }, this);
        }
      }

      return adjPos;
    }

    getNeighbours(x: number, y: number) {
      return [
        new p5.Vector(x - 1, y - 1),
        new p5.Vector(x, y - 1),
        new p5.Vector(x + 1, y - 1),

        new p5.Vector(x - 1, y),
        new p5.Vector(x + 1, y),

        new p5.Vector(x - 1, y + 1),
        new p5.Vector(x, y + 1),
        new p5.Vector(x + 1, y + 1),
      ];
    }

    initNest(nestX: number, nestY: number) {
      const nest = new Nest(nestX, nestY, this);
      this.grid[nestX][nestY] = nest;
      return nest;
    }

    initAnts(ants: number) {
      const antsArray = [];
      for (; ants; )
        for (; ants; ants--)
          antsArray.push(new Ant(this.nest.position.x, this.nest.position.y, this, this.p5));
  
      return antsArray;
    }

    initFood(food: number) {
        while (food--) {
            const x = Math.floor(Math.random() * this.gridX);
            const y = Math.floor(Math.random() * this.gridY);
            if (!(x == this.nest.position.x && y == this.nest.position.y))
                this.grid[x][y] = new Food(x, y, this);
            else food++;
        }
    }

    update() {
        for (let x = 0; x < this.gridX; x++)
            for (let y = 0; y < this.gridY; y++) this.grid[x][y].update();
        
        this.ants.forEach((ant: Ant) => ant.update());
    }

    renderAllOnce() {
      for (let x = 0; x < this.gridX; x++)
        for (let y = 0; y < this.gridY; y++) this.grid[x][y].render(this.p5);
    }

    render() {
      for (let x = 0; x < this.gridX; x++)
        for (let y = 0; y < this.gridY; y++)
          if (this.grid[x][y].type != "Obstacle") this.grid[x][y].render(this.p5);

      this.ants.forEach((ant: Ant) => ant.render());
      
      this.nest.render(this.p5);
    }

    getCell = (position: p5.Vector): Obstacle | Cell | Food | Nest =>
        this.grid[position.x][position.y];

    getAdjCellPos = (position: p5.Vector): Array<p5.Vector> =>
        this.adjPos[position.x][position.y];

    isSamePosition = (pos1: p5.Vector, pos2: p5.Vector): boolean =>
        pos1.x == pos2.x && pos1.y == pos2.y;
}

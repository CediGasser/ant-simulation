import p5 from 'p5'
import Constants from './Constants';
import type World from './World'

export default class Obstacle {
    position: p5.Vector;
    size: number;
    type: string;
  
    constructor(x: number, y: number) {
      this.position = new p5.Vector(x, y);
      this.size = Constants.CELL_SIZE;
      this.type = "Obstacle";
    }
  
    createObstacle(world: World) {
      if (
        !(
          this.position.x == world.nest.position.x &&
          this.position.y == world.nest.position.y
        )
      )
        world.grid[this.position.x][this.position.y] = new Obstacle(
          this.position.x,
          this.position.y
        );
    }
    update() {}
  
    render(p5: p5) {
        p5.fill(240, 100, 100);
        p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
  }
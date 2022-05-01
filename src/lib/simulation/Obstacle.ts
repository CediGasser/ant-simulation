import p5 from 'p5'
import type World from './World'

export default class Obstacle {
    position: p5.Vector;
    size: number;
    type: string;

    constructor(x: number, y: number) {
      this.position = new p5.Vector(x, y);
      this.size = 10;
      this.type = "Obstacle";
    }

    createObstacle(world: World) {
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

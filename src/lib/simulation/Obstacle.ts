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

    public createObstacle(world: World):void {
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
    public update():void {}

    public render(p5: p5):void {
        p5.fill(50);
        p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
  }

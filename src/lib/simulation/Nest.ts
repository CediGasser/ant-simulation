import Cell from './Cell'
import type p5 from 'p5'
import type World from './World';

export default class Nest extends Cell {
    constructor(x: number, y: number, world: World) {
      super(x, y, world);
      this.type = "Nest";
      this.nestDistance = 0;
    }

    stepOnCell() {}

    update() {}

    render(p5: p5) {
      p5.fill(100, 100, 100);
      p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
  }

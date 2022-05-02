import Cell from './Cell'
import type p5 from 'p5'
import type World from './World'

export default class Food extends Cell {
    foodLeft: number;
    world: World;
  
    constructor(x: number, y: number, world: World) {
      super(x, y, world);
      this.type = "Food";
      this.foodDistance = 0;
      this.foodLeft = 15;
      this.world = world;
    }
  
    eatFood() {
      this.foodLeft--;
    }
  
    update() {
        if (this.foodLeft <= 0)
            this.world.grid[this.position.x][this.position.y] = new Cell(
                this.position.x,
                this.position.y,
                this.world
        );
    }
  
    render(p5: p5) {
        p5.fill(20, 100, 100);
        p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
  }
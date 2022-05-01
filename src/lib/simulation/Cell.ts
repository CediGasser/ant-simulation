import Obstacle from './Obstacle'
import type p5 from 'p5'
import Constants from './Constants';
import type World from './World';

export default class Cell extends Obstacle {
    nestDistance: number;
    foodDistance: number;
    fDuration: number;
    steps: number;
    stepDuration: number;
    world: World;
  
    static stepDuration: number = Math.max(Constants.GRID_W, Constants.GRID_H) * 10;
    // Maximum food distance duration
    static foodMaxD: number = Math.max(Constants.GRID_W, Constants.GRID_H) * 1.5;
  
    constructor(x: number, y: number, world: World, steps: number = 0) {
      super(x, y);
      //this.position = createVector(x, y);
      // this.size = CELL_SIZE;
      this.type = "Cell";
      this.nestDistance = Number.MAX_SAFE_INTEGER;
      this.foodDistance = -1;
      this.fDuration = 0; // food distance duration
      this.steps = steps;
      this.stepDuration = Cell.stepDuration;
      this.world = world;
    }
  
    setCellsNestDistance(stepsFromNest: number) {
      this.setCellsDistance(stepsFromNest, "nest");
    }
  
    setFoodDistance(stepsFromFood: number) {
      this.setDistance(stepsFromFood, "food");
      this.fDuration = Cell.foodMaxD;
      // Never set nest value
      this.world.nest.foodDistance = -1;
    }
  
    setCellsDistance(steps: number, property: string) {
      this.setDistance(steps, property);
  
      this.world.adjPos[this.position.x][this.position.y].forEach(
        (position: p5.Vector) => {
          // Increase cells in same x or y index by +1
          if (position.x == this.position.x || position.y == this.position.y)
            (this.world.grid[position.x][position.y] as Cell).setDistance(
              steps + 1,
              property
            );
          // Diagonal values, increase by +2
          else
            (this.world.grid[position.x][position.y] as Cell).setDistance(
              steps + 2,
              property
            );
        },
        this
      );
    }
  
    setDistance(steps: number, property: string) {
      if (property == "nest") {
        if (this.nestDistance > steps) this.nestDistance = steps;
      } else {
        // property == "food"
        if (this.foodDistance == -1) this.foodDistance = steps;
        else if (this.foodDistance > steps) this.foodDistance = steps;
      }
    }
  
    eraseFoodTrail() {
      this.fDuration = 0;
    }
  
    stepOnCell() {
      this.addStep();
    }
  
    addStep(n = 1) {
      // Reset decrease count
      this.stepDuration = Cell.stepDuration;
      this.steps += n;
    }
  
    decreaseSteps() {
      this.steps--;
      // Decrease should stop at 0, but
      // performance is better when changed to that
      // this.steps = Math.max(--this.steps, 0);
    }
  
    update() {
      this.updateSteps();
      this.fDuration = Math.max(--this.fDuration, 0);
      // Reset when duration passes
      if (this.fDuration == 0) this.foodDistance = -1;
    }
  
    updateSteps() {
      this.stepDuration--;
      if (this.stepDuration < 0) this.decreaseSteps();
    }
  
    // For debugging purposes
    paintSpecial(p5: p5) {
      p5.fill(0);
      p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
  
    render(p5: p5) {
      if (this.fDuration == 0) p5.fill(48, 2, Math.max(98 - this.steps * 2, 20));
      // Make darker with more steps
      else p5.fill(50, 100, 100); // Show as pheromone (food trail)
      p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
  }
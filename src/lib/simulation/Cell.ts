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
    static foodMaxD: number = Math.max(Constants.GRID_W, Constants.GRID_H) * 1.5;

    constructor(x: number, y: number, world: World, steps: number = 0) {
      super(x, y);
      this.type = "Cell";
      this.nestDistance = Number.MAX_SAFE_INTEGER;
      this.foodDistance = -1;
      this.fDuration = 0;
      this.steps = steps;
      this.stepDuration = Cell.stepDuration;
      this.world = world;
    }

    public setCellsNestDistance(stepsFromNest: number): void {
      this.setCellsDistance(stepsFromNest, "nest");
    }

    public setFoodDistance(stepsFromFood: number): void {
      this.setDistance(stepsFromFood, "food");
      this.fDuration = Cell.foodMaxD;
      this.world.nest.foodDistance = -1;
    }

    private setCellsDistance(steps: number, property: string) {
      this.setDistance(steps, property);

      this.world.adjPos[this.position.x][this.position.y].forEach(
        (position: p5.Vector) => {
          if (position.x == this.position.x || position.y == this.position.y)
            (this.world.grid[position.x][position.y] as Cell).setDistance(
              steps + 1,
              property
            );
          else
            (this.world.grid[position.x][position.y] as Cell).setDistance(
              steps + 2,
              property
            );
        },
        this
      );
    }

    private setDistance(steps: number, property: string) {
      if (property == "nest") {
        if (this.nestDistance > steps) this.nestDistance = steps;
      } else {
        if (this.foodDistance == -1) this.foodDistance = steps;
        else if (this.foodDistance > steps) this.foodDistance = steps;
      }
    }

    public eraseFoodTrail(): void {
      this.fDuration = 0;
    }

    public stepOnCell(): void {
      this.addStep();
    }

    private addStep(n = 1) {
      this.stepDuration = Cell.stepDuration;
      this.steps += n;
    }

    private decreaseSteps() {
      this.steps--;
    }

    public update(): void {
      this.updateSteps();
      this.fDuration = Math.max(--this.fDuration, 0);
      if (this.fDuration == 0) this.foodDistance = -1;
    }

    private updateSteps() {
      this.stepDuration--;
      if (this.stepDuration < 0) this.decreaseSteps();
    }

    public render(p5: p5): void {
      if (this.fDuration == 0) p5.fill(131, 101, Math.max(57 - this.steps * 2, 20));   // Darken with more steps
      else p5.fill('#92a4ac');                                                   // Or show as pheromone trail
      p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
  }

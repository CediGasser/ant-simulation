import type p5 from 'p5'
import Parameters from '../environment/SimulationParameters';
import type World from '../World';
import {EntityTypes} from "./types/EntityTypes";
import BaseEntity from "./BaseEntity";
import Colors from "../environment/Colors";

export default class Cell extends BaseEntity {
    nestDistance: number;
    foodDistance: number;
    fDuration: number;
    steps: number;
    stepDuration: number;
    world: World;

    static stepDuration: number = Math.max(Parameters.GRID_W, Parameters.GRID_H) * 10;
    static foodMaxD: number = Math.max(Parameters.GRID_W, Parameters.GRID_H) * 1.5;

    constructor(x: number, y: number, world: World) {
        super(x, y, EntityTypes.CELL);
        this.nestDistance = Number.MAX_SAFE_INTEGER;
        this.foodDistance = -1;
        this.fDuration = 0;
        this.steps = 0;
        this.stepDuration = Cell.stepDuration;
        this.world = world;
    }

    public render(p5: p5): void {
        if (this.fDuration == 0) {
            p5.fill(
                Colors.FIELD_COLOR[0],
                Colors.FIELD_COLOR[1],
                this.setBrightnessValue(Colors.FIELD_COLOR[2])
            );
        } else {
            p5.fill(Colors.PHEROMON_COLOR);
        }
        p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }

    public update(): void {
        this.updateSteps();
        this.fDuration = Math.max(--this.fDuration, 0);
        if (this.fDuration == 0) {
            this.foodDistance = -1;
        }
    }

    public setCellsNestDistance(stepsFromNest: number): void {
        this.setCellsDistance(stepsFromNest, EntityTypes.NEST);
    }

    public setFoodDistance(stepsFromFood: number): void {
        this.setDistance(stepsFromFood, EntityTypes.FOOD);
        this.fDuration = Cell.foodMaxD;
        this.world.nest.foodDistance = -1;
    }

    private setCellsDistance(steps: number, property: string): void {
        this.setDistance(steps, property);

        this.world.adjPos[this.position.x][this.position.y].forEach(
            (position: p5.Vector) => {
                if (position.x == this.position.x || position.y == this.position.y) {
                    (this.world.grid[position.x][position.y] as Cell).setDistance(
                        steps + 1,
                        property
                    );
                } else {
                    (this.world.grid[position.x][position.y] as Cell).setDistance(
                        steps + 2,
                        property
                    );
                }
            },
            this
        );
    }

    private setDistance(steps: number, property: string): void {
        if (property == EntityTypes.NEST) {
            if (this.nestDistance > steps) {
                this.nestDistance = steps;
            }
        } else {
            if (this.foodDistance == -1) {
                this.foodDistance = steps;
            } else if (this.foodDistance > steps) {
                this.foodDistance = steps;
            }
        }
    }

    public eraseFoodTrail(): void {
        this.fDuration = 0;
    }

    public stepOnCell(): void {
        this.stepDuration = Cell.stepDuration;
        this.steps += 1;
    }

    private decreaseSteps(): void {
        this.steps--;
    }

    private updateSteps(): void {
        this.stepDuration--;
        if (this.stepDuration < 0) {
            this.decreaseSteps();
        }
    }

    private setBrightnessValue(brightness: number): number {
        const valueInRange = Math.max(brightness - this.steps * 2, 20);
        if (valueInRange > brightness) {
            return brightness
        }
        return valueInRange
    }
}



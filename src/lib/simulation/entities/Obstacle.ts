import type p5 from 'p5'
import type World from '../World'
import BaseEntity from "./BaseEntity";
import {EntityTypes} from "./types/EntityTypes";
import Parameters from "../environment/SimulationParameters";

export default class Obstacle extends BaseEntity {

    constructor(x: number, y: number) {
        super(x, y, EntityTypes.OBSTACLE);
    }

    public render(p5: p5): void {
        p5.fill(Parameters.OBSTACLE_COLOR);
        p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }

    public update(): void {
    }

    public createObstacle(world: World): void {
        if (this.isNestPosition(world)) {
            world.grid[this.position.x][this.position.y] = new Obstacle(this.position.x, this.position.y);
        }
    }

    private isNestPosition(world: World): boolean {
        return this.position.x != world.nest.position.x && this.position.y != world.nest.position.y
    }
}

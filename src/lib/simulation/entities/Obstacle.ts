import p5 from 'p5'
import Constants from '../environment/SimulationParameters';
import type World from '../World'
import {EntityTypes} from "./types/EntityTypes";

export default class Obstacle {
    position: p5.Vector;
    size: number;
    type: string;

    constructor(x: number, y: number) {
        this.position = new p5.Vector(x, y);
        this.size = Constants.CELL_SIZE;
        this.type = EntityTypes.OBSTACLE;
    }

    public createObstacle(world: World): void {
        if (this.isNestPosition(world)) {
            world.grid[this.position.x][this.position.y] = new Obstacle(this.position.x, this.position.y);
        }
    }

    private isNestPosition(world: World): boolean {
        return this.position.x != world.nest.position.x && this.position.y != world.nest.position.y
    }

    public update(): void {
    }

    public render(p5: p5): void {
        p5.fill('#646464');
        p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
}

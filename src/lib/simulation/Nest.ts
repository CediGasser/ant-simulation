import Cell from './Cell'
import type p5 from 'p5'
import type World from './World';
import {EntityTypes} from "./EntityTypes";

export default class Nest extends Cell {
    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.type = EntityTypes.NEST;
        this.nestDistance = 0;
    }

    public stepOnCell(): void {
    }

    public update(): void {
    }

    public render(p5: p5): void {
        p5.fill('#836539');
        p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
}

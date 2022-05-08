import Cell from './Cell'
import Constants from './SimulationParameters';
import type p5 from 'p5'
import type World from './World'
import {EntityTypes} from "./EntityTypes";

export default class Food extends Cell {
    foodLeft: number;
    world: World;

    constructor(x: number, y: number, world: World) {
        super(x, y, world);
        this.type = EntityTypes.FOOD;
        this.foodDistance = 0;
        this.foodLeft = Constants.FOOD_STOCK;
        this.world = world;
    }

    public eatFood(): void {
        this.foodLeft--;
    }

    public update(): void {
        if (this.foodLeft <= 0) {
            this.world.grid[this.position.x][this.position.y] = new Cell(this.position.x, this.position.y, this.world);
        }
    }

    public render(p5: p5): void {
        p5.fill('#FFFFFF');
        p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
}

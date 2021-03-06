import Cell from './entities/Cell'
import Nest from './entities/Nest'
import Food from './entities/Food'
import Obstacle from './entities/Obstacle'
import Ant from './entities/Ant'
import Parameters from './environment/SimulationParameters'
import p5 from 'p5'
import {EntityTypes} from "./entities/types/EntityTypes";
import type BaseEntity from "./entities/BaseEntity";

export default class World {
    gridX: number;
    gridY: number;
    grid: Array<Array<BaseEntity>>;
    nest: Nest;
    adjPos: Array<Array<Array<p5.Vector>>>;
    ants: Array<Ant>;
    p5: p5;

    constructor(
        p5: p5,
        initValues = {
            gridX: Parameters.GRID_W,
            gridY: Parameters.GRID_H,
            obstacleCount: Parameters.OBSTACLE_COUNT,
            ants: Parameters.ANTS,
            nestX: Parameters.NEST_X,
            nestY: Parameters.NEST_Y,
            food: Parameters.FOOD,
        }
    ) {
        const {gridX, gridY, obstacleCount, ants, nestX, nestY, food} =
            initValues;
        this.gridX = gridX;
        this.gridY = gridY;
        this.p5 = p5;
        this.grid = this.initGrid();
        this.nest = this.initNest(nestX, nestY);
        this.adjPos = this.getAdjPositions();
        this.addObstacles(obstacleCount);
        if (food) this.initFood(food);

        this.adjPos = this.getAdjPositions();
        this.ants = this.initAnts(ants);
        this.renderAllOnce();
    }

    public render(): void {
        for (let x = 0; x < this.gridX; x++)
            for (let y = 0; y < this.gridY; y++)
                if (this.grid[x][y].type != EntityTypes.OBSTACLE) this.grid[x][y].render(this.p5);

        this.ants.forEach((ant: Ant) => ant.render());

        this.nest.render(this.p5);
    }

    public update(): void {
        for (let x = 0; x < this.gridX; x++)
            for (let y = 0; y < this.gridY; y++) this.grid[x][y].update();

        this.ants.forEach((ant: Ant) => ant.update());
    }

    private initGrid(): Array<Array<BaseEntity>> {
        const grid = [];
        for (let x = 0; x < this.gridX; x++) {
            grid.push([]);
            for (let y = 0; y < this.gridY; y++) grid[x][y] = new Cell(x, y, this);
        }
        return grid;
    }

    private addObstacles(quantity: number): void {
        while (quantity--) {
            let x = Math.floor(Math.random() * this.gridX);
            let y = Math.floor(Math.random() * this.gridY);
            let expansions = Parameters.OBSTACLE_SIZE;
            while (expansions--) {
                new Obstacle(x, y).createObstacle(this);
                this.adjPos[x][y].forEach((position: p5.Vector) => {
                    if (this.grid[position.x][position.y].type != EntityTypes.NEST)
                        this.grid[position.x][position.y] = new Obstacle(
                            position.x,
                            position.y
                        );
                }, this);
                const nextPos = this.p5.random(this.adjPos[x][y]);
                x = nextPos.x;
                y = nextPos.y;
            }
        }
    }

    private getAdjPositions(): Array<Array<Array<p5.Vector>>> {
        const adjPos: Array<Array<Array<p5.Vector>>> = [];
        for (let x = 0; x < this.gridX; x++) {
            adjPos.push([]);
            for (let y = 0; y < this.gridY; y++) {
                const neighbours = World.getNeighbours(x, y);
                adjPos[x][y] = [];
                neighbours.forEach(async (position) => {
                    try {
                        const cell = this.grid[position.x][position.y];
                        if (cell.type != EntityTypes.OBSTACLE) adjPos[x][y].push(position);
                    } catch (error) {
                        if (!(error instanceof TypeError)) throw error;
                    }
                }, this);
            }
        }

        return adjPos;
    }

    private static getNeighbours(x: number, y: number): p5.Vector[] {
        return [
            new p5.Vector(x - 1, y - 1),
            new p5.Vector(x, y - 1),
            new p5.Vector(x + 1, y - 1),

            new p5.Vector(x - 1, y),
            new p5.Vector(x + 1, y),

            new p5.Vector(x - 1, y + 1),
            new p5.Vector(x, y + 1),
            new p5.Vector(x + 1, y + 1),
        ];
    }

    private initNest(nestX: number, nestY: number): Nest {
        const nest = new Nest(nestX, nestY, this);
        this.grid[nestX][nestY] = nest;
        return nest;
    }

    private initAnts(ants: number): Ant[] {
        const antsArray = [];
        for (; ants;)
            for (; ants; ants--)
                antsArray.push(new Ant(this.nest.position.x, this.nest.position.y, this, this.p5));

        return antsArray;
    }

    private initFood(food: number): void {
        while (food--) {
            const x = Math.floor(Math.random() * this.gridX);
            const y = Math.floor(Math.random() * this.gridY);
            if (!(x == this.nest.position.x && y == this.nest.position.y))
                this.grid[x][y] = new Food(x, y, this);
            else food++;
        }
    }

    private renderAllOnce(): void {
        for (let x = 0; x < this.gridX; x++)
            for (let y = 0; y < this.gridY; y++) this.grid[x][y].render(this.p5);
    }
}

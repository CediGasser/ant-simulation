import Obstacle from "./Obstacle";
import p5 from 'p5';
import Constants from './Constants'
import type World from "./World";
import type Cell from './Cell';
import type Food from './Food';

export default class Ant extends Obstacle {
    state: string;
    stepsFromNest: number;
    stepsFromFood: number;
    erase: boolean;
    prevPosition: p5.Vector;
    world: World;
    p5: p5;

    static maxFuel = Math.max(Constants.GRID_W, Constants.GRID_H) * 1.5;

    constructor(x: number, y: number, world: World, sketch: p5) {
        super(x, y);
        //this.position = createVector(x, y);
        // this.size = CELL_SIZE;
        this.type = "Ant";
        this.state = Constants.SCAVENGER_MODE;
        // this.fuel = Ant.maxFuel;
        this.stepsFromNest = 0;
        this.stepsFromFood = -1;
        this.erase = false;
        this.prevPosition = new p5.Vector(-1, -1);
        // this.penalty = 0;
        this.world = world;
        this.p5 = sketch;
    }

    public update(): void {
        // Ants change `steps` property only when scavenging
        // Used to avoid ants looping while delivering food
        if (this.world.grid[this.position.x][this.position.y].type == "Nest")
            this.reachedNest();

        if (this.world.grid[this.position.x][this.position.y].type == "Food")
            this.reachedFood();

        // Update current cell steps count
        (this.world.getCell(this.position) as Cell).stepOnCell();

        this.stepsFromNest++;
        if (this.stepsFromFood >= 0) this.stepsFromFood++;

        // Getting new position
        let newPos: p5.Vector;
        if (this.state == Constants.SCAVENGER_MODE) {
            // Try getting food trail, else move randomly
            // If initial position is the nest, then move randomly
            if (
                this.isCloseToNest() ||
                !(newPos = this.getMinDistanceFood()) ||
                this.world.isSamePosition(newPos, this.prevPosition)
            )
                do newPos = this.randomWalk();
                while (
                    // Get a random new position that is not the
                    // previous one. Unless that's the only one
                this.world.getAdjCellPos(this.position).length != 1 &&
                this.world.isSamePosition(newPos, this.prevPosition)
                    );
        }
        // DELIVERY_MODE
        else {
            newPos = this.getMinNestDistanceCell();
            if (this.erase) (this.world.getCell(this.position) as Cell).eraseFoodTrail();
        }

        if (this.isDiagonal(newPos)) {
            this.stepsFromNest++;
            if (this.stepsFromFood >= 0) this.stepsFromFood++;
        }

        this.saveOldPosition();
        this.updatePosition(newPos);

        if (this.state == Constants.SCAVENGER_MODE) this.updateNestDistance();
        // DELIVERY_MODE
        else if (this.stepsFromFood != -1)
            (this.world.getCell(this.position) as Cell).setFoodDistance(this.stepsFromFood);
        // TODO update prevPositions
    }

    private getMinDistanceFood() {
        const initialDistance =
            (this.world.getCell(this.position) as Cell).foodDistance == -1
                ? Number.MAX_SAFE_INTEGER
                : (this.world.getCell(this.position) as Cell).foodDistance;
        // Return a cell with less food distance, undefined if none
        const newPos = this.world.adjPos[this.position.x][this.position.y].reduce(
            (foodPos: p5.Vector, nextPos: p5.Vector) => {
                // If nextPos doesn't have a valid value, skip
                if ((this.world.grid[nextPos.x][nextPos.y] as Cell).foodDistance == -1)
                    return foodPos;
                // If current foodPos isn't set ( == -1) but next is set
                if ((this.world.grid[foodPos.x][foodPos.y] as Cell).foodDistance == -1)
                    return nextPos;
                // If nextPos is a valid value, update to min
                if (
                    (this.world.grid[foodPos.x][foodPos.y] as Cell).foodDistance != -1 &&
                    (this.world.grid[nextPos.x][nextPos.y] as Cell).foodDistance <
                    (this.world.grid[foodPos.x][foodPos.y] as Cell).foodDistance
                )
                    return nextPos;
                return foodPos;
            }
        );

        // If no improvement, abort
        if ((this.world.getCell(newPos) as Cell).foodDistance >= initialDistance)
            return undefined;

        // Return newPos if it has a valid foodDistance value
        if ((this.world.grid[newPos.x][newPos.y] as Cell).foodDistance != -1)
            return newPos;
        return undefined;
    }

    private getMinNestDistanceCell() {
        return this.world.adjPos[this.position.x][this.position.y].reduce(
            (minPos: p5.Vector, nextPos: p5.Vector) => {
                if (
                    (this.world.grid[nextPos.x][nextPos.y] as Cell).nestDistance <
                    (this.world.grid[minPos.x][minPos.y] as Cell).nestDistance
                )
                    return nextPos;
                return minPos;
            }
        );
    }

    private randomWalk() {
        return this.p5.random(this.world.adjPos[this.position.x][this.position.y]);
    }

    private isCloseToNest() {
        return this.world.isSamePosition(this.position, this.world.nest.position);
    }

    private startEraseFoodTrail() {
        this.erase = true;
    }

    private saveOldPosition() {
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
    }

    private updatePosition(newPos: p5.Vector) {
        this.position.x = newPos.x;
        this.position.y = newPos.y;
    }

    private updateNestDistance() {
        if (this.stepsFromNest > (this.world.getCell(this.position) as Cell).nestDistance)
            // Update ant distance to cell stored value
            this.stepsFromNest = (this.world.getCell(this.position) as Cell).nestDistance;
        // Update cells with ant's new closest distance
        else
            (this.world.getCell(this.position) as Cell).setCellsNestDistance(this.stepsFromNest);
    }

    private isDiagonal(newPos: p5.Vector) {
        return !(this.position.x == newPos.x || this.position.y == newPos.y);
    }

    private reachedFood() {
        this.stepsFromFood = 0;
        (this.world.getCell(this.position) as Food).eatFood();
        if ((this.world.getCell(this.position) as Food).foodLeft <= 0)
            this.startEraseFoodTrail();
        this.state = Constants.DELIVERY_MODE;
    }

    private reachedNest() {
        this.stepsFromNest = 0;
        this.stepsFromFood = -1;
        this.resetPrevPosition();
        this.state = Constants.SCAVENGER_MODE;
        this.erase = false;
    }

    private resetPrevPosition() {
        this.prevPosition.x = this.world.nest.position.x;
        this.prevPosition.y = this.world.nest.position.y;
    }

    public render(): void {
        this.p5.fill(0, 0, 0);
        this.p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
}

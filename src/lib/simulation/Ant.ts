import Obstacle from "./Obstacle";
import p5 from 'p5';
import type World from "./World";
import type Cell from './Cell';
import type Food from './Food';
import {AntStates} from "./AntStates";
import {EntityTypes} from "./EntityTypes";

export default class Ant extends Obstacle {
    state: string;
    stepsFromNest: number;
    stepsFromFood: number;
    erase: boolean;
    prevPosition: p5.Vector;
    world: World;
    p5: p5;

    constructor(x: number, y: number, world: World, sketch: p5) {
        super(x, y);
        this.type = EntityTypes.ANT;
        this.state = AntStates.SCAVENGER_MODE;
        this.stepsFromNest = 0;
        this.stepsFromFood = -1;
        this.erase = false;
        this.prevPosition = new p5.Vector(-1, -1);
        this.world = world;
        this.p5 = sketch;
    }

    public update(): void {
        if (this.world.grid[this.position.x][this.position.y].type == EntityTypes.NEST) {
            this.reachedNest();
        }

        if (this.world.grid[this.position.x][this.position.y].type == EntityTypes.FOOD) {
            this.reachedFood();
        }
        (this.world.getCell(this.position) as Cell).stepOnCell();

        this.stepsFromNest++;
        if (this.stepsFromFood >= 0) {
            this.stepsFromFood++;
        }

        let newPos: p5.Vector;
        if (this.state == AntStates.SCAVENGER_MODE) {
            if (
                this.isCloseToNest() ||
                !(newPos = this.getMinDistanceFood()) ||
                this.world.isSamePosition(newPos, this.prevPosition)
            ) {
                do newPos = this.randomWalk();
                while (
                    this.world.getAdjCellPos(this.position).length != 1 &&
                    this.world.isSamePosition(newPos, this.prevPosition)
                    );
            }
        }
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

        if (this.state == AntStates.SCAVENGER_MODE) {
            this.updateNestDistance();
        }
        else if (this.stepsFromFood != -1) {
            (this.world.getCell(this.position) as Cell).setFoodDistance(this.stepsFromFood);
        }
    }

    private getMinDistanceFood(): p5.Vector {
        const initialDistance =
            (this.world.getCell(this.position) as Cell).foodDistance == -1
                ? Number.MAX_SAFE_INTEGER
                : (this.world.getCell(this.position) as Cell).foodDistance;
        const newPos = this.world.adjPos[this.position.x][this.position.y].reduce(
            (foodPos: p5.Vector, nextPos: p5.Vector) => {
                if ((this.world.grid[nextPos.x][nextPos.y] as Cell).foodDistance == -1) {
                    return foodPos;
                }
                if ((this.world.grid[foodPos.x][foodPos.y] as Cell).foodDistance == -1) {
                    return nextPos;
                }
                if (
                    (this.world.grid[foodPos.x][foodPos.y] as Cell).foodDistance != -1 &&
                    (this.world.grid[nextPos.x][nextPos.y] as Cell).foodDistance <
                    (this.world.grid[foodPos.x][foodPos.y] as Cell).foodDistance
                ) {
                    return nextPos;
                }

                return foodPos;
            }
        );

        if ((this.world.getCell(newPos) as Cell).foodDistance >= initialDistance) {
            return undefined;
        }

        if ((this.world.grid[newPos.x][newPos.y] as Cell).foodDistance != -1) {
            return newPos;
        }
        return undefined;
    }

    private getMinNestDistanceCell(): p5.Vector {
        return this.world.adjPos[this.position.x][this.position.y].reduce(
            (minPos: p5.Vector, nextPos: p5.Vector) => {
                if (
                    (this.world.grid[nextPos.x][nextPos.y] as Cell).nestDistance <
                    (this.world.grid[minPos.x][minPos.y] as Cell).nestDistance
                ) {
                    return nextPos;
                }
                return minPos;
            }
        );
    }

    private randomWalk(): p5.Vector {
        return this.p5.random(this.world.adjPos[this.position.x][this.position.y]);
    }

    private isCloseToNest(): boolean {
        return this.world.isSamePosition(this.position, this.world.nest.position);
    }

    private startEraseFoodTrail(): void {
        this.erase = true;
    }

    private saveOldPosition(): void {
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
    }

    private updatePosition(newPos: p5.Vector): void {
        this.position.x = newPos.x;
        this.position.y = newPos.y;
    }

    private updateNestDistance(): void {
        if (this.stepsFromNest > (this.world.getCell(this.position) as Cell).nestDistance) {
            this.stepsFromNest = (this.world.getCell(this.position) as Cell).nestDistance;
        } else {
            (this.world.getCell(this.position) as Cell).setCellsNestDistance(this.stepsFromNest);
        }
    }

    private isDiagonal(newPos: p5.Vector): boolean {
        return this.position.x != newPos.x || this.position.y != newPos.y;
    }

    private reachedFood(): void {
        this.stepsFromFood = 0;
        (this.world.getCell(this.position) as Food).eatFood();
        if ((this.world.getCell(this.position) as Food).foodLeft <= 0) {
            this.startEraseFoodTrail();
        }
        this.state = AntStates.DELIVERY_MODE;
    }

    private reachedNest(): void {
        this.stepsFromNest = 0;
        this.stepsFromFood = -1;
        this.resetPrevPosition();
        this.state = AntStates.SCAVENGER_MODE;
        this.erase = false;
    }

    private resetPrevPosition(): void {
        this.prevPosition.x = this.world.nest.position.x;
        this.prevPosition.y = this.world.nest.position.y;
    }

    public render(): void {
        this.p5.fill('#000000');
        this.p5.square(this.position.x * this.size, this.position.y * this.size, this.size);
    }
}

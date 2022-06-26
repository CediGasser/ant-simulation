import p5 from 'p5'
import type {EntityTypes} from "./types/EntityTypes";
import Constants from "../environment/SimulationParameters";

export default abstract class BaseEntity {

    position: p5.Vector
    type: EntityTypes
    size: number
    antType: number

    protected constructor(x: number, y: number, type: EntityTypes) {
        this.position = new p5.Vector(x, y);
        this.type = type;
        this.size = Constants.CELL_SIZE;
        this.antType = Constants.ANT_TYPE
    }

    abstract render(p5: p5): void

    abstract update(): void
}

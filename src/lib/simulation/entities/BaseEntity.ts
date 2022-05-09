import type p5 from 'p5'
import type {EntityTypes} from "./types/EntityTypes";

export default interface BaseEntity {

    position: p5.Vector
    size: number
    type: EntityTypes

    render(p5: p5): void

    update(): void

}

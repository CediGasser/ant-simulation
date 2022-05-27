import type p5 from 'p5'
import World from './World'
import Parameters from './environment/SimulationParameters';

export default class Simulation {
    p5: p5;
    world: World

    constructor(p5: p5) {
        this.p5 = p5;
        this.setup();
    }

    public draw(): void {
        this.world.update();
        this.world.render();
    }

    public setRunning(running: boolean): void {
        if (running) {
            this.p5.loop();
        } else {
            this.p5.noLoop();
        }
    }

    public reset(): void {
        this.world = this.createWorld();
    }

    private setup(): void {
        this.p5.frameRate(Parameters.FRAMERATE);
        this.p5.colorMode(this.p5.HSB);
        this.p5.strokeWeight(0);
        this.world = this.createWorld();
        this.world.render();
    }

    public setFramerate(framerate: number): void {
        this.p5.frameRate(framerate);
    }

    private createWorld(): World {
        let newWorld: World;
        do newWorld = new World(this.p5);
        while (
            newWorld.adjPos[newWorld.nest.position.x][newWorld.nest.position.y].length == 0
            )

        return newWorld;
    }
}

import type p5 from 'p5'
import World from './World'

export default class Simulation {
    p5: p5;
    world: World

    constructor(p5: p5) {
        this.p5 = p5;
        this.setup();
    }

    setup() {
        this.p5.frameRate(10);

        this.p5.colorMode(this.p5.HSB);
        this.p5.background(0, 0, 100);
        this.p5.strokeWeight(0);

        this.world = this.createWorld();
        this.world.render();
      }

    draw() {
        this.world.update();
        this.world.render();
    }

    createWorld = (): World => {
        let newWorld: World;
        do newWorld = new World(this.p5);
        while (
          newWorld.adjPos[newWorld.nest.position.x][newWorld.nest.position.y]
            .length == 0
        );

        return newWorld;
    };
}

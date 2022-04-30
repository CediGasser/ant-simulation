import type {Ant, Nest, FoodSource, Obstacle} from './ObjectTypes'
import * as PIXI from 'pixi.js'
import type * as PIXIType from 'pixi.js';

export default class PixiSimulation {
    
    private app: PIXIType.Application
    private antCount: number
    private nest: Nest
    private foodSources: FoodSource[]
    private ants: Ant[]
    private obstacles: Obstacle[]

    private dataSubscriptions: ((data: object) => object)[]

    constructor(canvasContainer: HTMLElement) {
        this.app = new PIXI.Application()
        canvasContainer.appendChild(this.app.view)


    }

    start() {
        this.app.start()
    }

    pause() {
        this.app.stop()
    }

    reset() {
        // instantiate objects new etc..
    }

    render() {
        if (!this.nest && !this.ants && !this.foodSources) {
            this.pause()
            return
        }

        this.clearCanvas()

        this.nest.draw()

        for (let i = 0, n = this.ants.length; i < n; i++) {
            this.ants[i].draw()
        }

        for (let i = 0, n = this.foodSources.length; i < n; i++) {
            this.foodSources[i].draw()
        } 
    }

    tick() {
        // run each tick, in defined intervals
        // Calc new positions of everything etc
        // call all DataSubscribers
    }

    clearCanvas() {
        // clear all drawings bla bla...
    }

    subscribeData(callback: (data: object) => object): void {
        this.dataSubscriptions.push(callback)
    }

    removeSubscription(callback: (data: object) => object): void {
        this.dataSubscriptions = this.dataSubscriptions.filter(i => i !== callback)
    }
}
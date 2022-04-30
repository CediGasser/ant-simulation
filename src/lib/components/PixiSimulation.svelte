<script lang="ts">
    import { onMount } from 'svelte'
    import * as PIXI from 'pixi.js'
    import type * as PIXIType from 'pixi.js'
    import PixiSimulation from '$lib/simulation/PixiSimulation'

    
    // external properties
    export let antCount = 100
    export let antSize = 1
    export let playing = false

    let canvasDiv: HTMLElement
    let simulation: PixiSimulation
    
    onMount(async () => {
        simulation = new PixiSimulation(canvasDiv)
    })

    

    // let update = () => {
    //     // Each game tick etc...
    // }

    // onMount(async () => {
    //     // New PIXI.Application mache und alles initialisieren
    //     app = new PIXI.Application({width: 640, height: 640})
    //     canvasDiv.appendChild(app.view)
        
    //     // Adding new Point to the stage
    //     let fillStyle = new PIXI.FillStyle()
    //     fillStyle.color = 0xffffff
    //     fillStyle.visible = true
    //     fillStyle.alpha = 0

    //     let circle = new PIXI.Circle(100,100,40)

    //     let geometry = new PIXI.GraphicsGeometry()

    //     let graphic = new PIXI.Graphics(geometry)
        
    //     app.stage.addChild(graphic)

    //     geometry.drawShape(circle, fillStyle)

    //     // let graphics = new PIXI.Graphics()
    //     // graphics.beginFill(0xffffff)
    //     // graphics.drawCircle(300,300,40 )
    //     // graphics.endFill()
        

    // })
</script>

<div bind:this={canvasDiv}/>

<style>
    div {
        width: 640px;
        height: 640px;
        background-color: #ffffff;
        border-radius: 24px;
        padding: 8px
    }
</style>

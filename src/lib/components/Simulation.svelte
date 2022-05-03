<script lang="ts" context="module">
	import P5, { type Sketch } from 'p5-svelte'
    import Simulation from '$lib/simulation/Simulation'
	
	let simulation: Simulation

	export function resetSimulation() { simulation.reset() }
</script>

<script lang="ts">    
	export let running: boolean
	$: simulation?.setRunning(running)

    const sketch: Sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(p5.windowWidth, p5.windowHeight)
            simulation = new Simulation(p5)
		};
		p5.draw = () => {
			p5.ellipse(p5.width / 2, p5.height / 2, 10, 10)
            simulation.draw()
		};
	}
</script>

<div>
	<P5 {sketch}/>
</div>
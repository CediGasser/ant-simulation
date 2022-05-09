<script lang="ts" context="module">
	import P5, { type Sketch } from 'p5-svelte'
    import Simulation from '$lib/simulation/Simulation'
	import Parameters from "../simulation/environment/SimulationParameters";

	let simulation: Simulation

	export function resetSimulation() { simulation.reset() }

	export let running: boolean
	$: simulation?.setRunning(running)

    const sketch: Sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(Parameters.GRID_W * Parameters.CELL_SIZE, Parameters.GRID_H * Parameters.CELL_SIZE)
            simulation = new Simulation(p5)
		};
		p5.draw = () => {
			p5.ellipse(p5.width / 2, p5.height / 2, 10, 10)
            simulation.draw()
		};
	}
</script>

<div class="center">
	<P5 {sketch}/>
</div>

<style>
	.center {
		margin: auto;
		width: 50%;
	}
</style>

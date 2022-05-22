<script lang="ts" context="module">
	import P5, { type Sketch } from 'p5-svelte'
    import Simulation from '$lib/simulation/Simulation'

	let simulation: Simulation

	export function resetSimulation() { simulation.reset() }
</script>

<script lang="ts">
	import Parameters from "../simulation/environment/SimulationParameters";
	
	export let running: boolean
	
	$: simulation?.setRunning(running)

    const sketch: Sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(Parameters.GRID_W * Parameters.CELL_SIZE, Parameters.GRID_H * Parameters.CELL_SIZE)
            simulation = new Simulation(p5)
		};
		p5.draw = () => {
            simulation.draw()
		};
	}
</script>

<div>
	<P5 {sketch}/>
</div>

<style>
	div {
		box-shadow: var(--shadow);
		display: inline-block;
		border-radius: var(--radius);
		overflow: hidden;
	}
</style>

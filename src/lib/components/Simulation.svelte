<script lang="ts" context="module">
	import type P5 from 'p5'
	import type Simulation from '$lib/simulation/Simulation'

	let simulation: Simulation

	export function resetSimulation() { simulation?.reset() }
	export function setFramerate(framerate: number) { simulation?.setFramerate(framerate) }
</script>

<script lang="ts">
	import Parameters from "../simulation/environment/SimulationParameters";
	import { onMount } from 'svelte';

	
	
	let p5Div: HTMLDivElement

	export let running: boolean
	
	$: simulation?.setRunning(running)

	onMount(async () => {
		let {default: p5} = await import('p5')
		let Simulation = (await import('$lib/simulation/Simulation')).default

		if (window.innerWidth < 500) {
			Parameters.CELL_SIZE = 4
		}

		let sketch = (p5: P5) => {
			p5.setup = () => {
				p5.createCanvas(Parameters.GRID_W * Parameters.CELL_SIZE, Parameters.GRID_H * Parameters.CELL_SIZE)
				simulation = new Simulation(p5)
			};
			p5.draw = () => {
				simulation.draw()
			};
		}

		new p5(sketch, p5Div)
	})
</script>

<div bind:this={p5Div}>
</div>

<style>
	div {
		box-shadow: var(--shadow);
		display: inline-block;
		border-radius: var(--radius);
		overflow: hidden;
	}
</style>

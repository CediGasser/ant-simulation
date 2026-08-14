<script lang="ts">
	import Simulation, { resetSimulation, setFramerate } from '$lib/components/Simulation.svelte';
	import PerformanceMeter from '$lib/components/PerformanceMeter.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Button from '$lib/components/Button.svelte';
	import Paper from '$lib/components/Paper.svelte';
	import Parameters from '$lib/simulation/environment/SimulationParameters.svelte';

	let running = $state(true);
	let framerate = $state(Parameters.FRAMERATE);
	let antSlider = $state(4);
	let colorPresets = ['Carpenter Ants', 'Fire Ants'];
	let selectedPreset = $state('Carpenter Ants');

	function exponential(position: number): number {
		// position will be between 0 and 100
		const minp = 0;
		const maxp = 100;

		// The result should be between 5 and 2000
		const minv = Math.log(5);
		const maxv = Math.log(2000);

		// calculate adjustment factor
		const scale = (maxv - minv) / (maxp - minp);

		return Number(Math.exp(minv + scale * (position - minp)).toFixed(0));
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.code === 'Space') {
			running = !running;
			event.preventDefault();
		}
	}

	$effect(() => {
		Parameters.ANT_TYPE = colorPresets.indexOf(selectedPreset);
		resetSimulation();
	});

	$effect(() => {
		setFramerate(framerate);
	});

	$effect(() => {
		Parameters.ANTS = exponential(antSlider);
	});
</script>

<Seo
	title="Ant Simulation"
	keywords="Ants Simulation"
	type="Website"
	description="An interactive ant simulation. Thats realy about it. Oh, and we also made a paper about the stuff we learned."
	image="/social_preview.png"
/>

<svelte:window onkeydown={handleKeydown} />

<main>
	<Simulation {running} />
	<Paper>
		<div class="controls">
			<Button variant="filled" onclick={() => (running = !running)}>
				{#if running}
					Pause
				{:else}
					Play
				{/if}
			</Button>
			<Button variant="outline" onclick={resetSimulation}>Reset</Button>
			<PerformanceMeter />
		</div>
		<hr />
		<select aria-label="Color preset" bind:value={selectedPreset}>
			{#each colorPresets as preset (preset)}
				<option value={preset}>{preset}</option>
			{/each}
		</select>
		<input
			id="obstacleCountSlider"
			class="slider"
			onchange={resetSimulation}
			type="range"
			bind:value={Parameters.OBSTACLE_COUNT}
			min="0"
			max="80"
			step="1"
		/>
		<label for="obstacleCountSlider"> Obstacle Count: {Parameters.OBSTACLE_COUNT}</label><br />
		<input
			id="obstacleSizeSlider"
			class="slider"
			onchange={resetSimulation}
			type="range"
			bind:value={Parameters.OBSTACLE_SIZE}
			min="1"
			max="6"
			step="1"
		/>
		<label for="obstacleSizeSlider"> Obstacle Size: {Parameters.OBSTACLE_SIZE}</label><br />
		<input
			id="antsCountSlider"
			class="slider"
			onchange={resetSimulation}
			type="range"
			bind:value={antSlider}
			min="0"
			max="100"
			step="1"
		/>
		<label for="antsCountSlider"> Ants: {Parameters.ANTS}</label><br />
		<input
			id="foodCountSlider"
			class="slider"
			onchange={resetSimulation}
			type="range"
			bind:value={Parameters.FOOD}
			min="1"
			max="80"
			step="1"
		/>
		<label for="foodCountSlider"> Food: {Parameters.FOOD}</label>
		<input
			id="framerateSlider"
			class="slider"
			type="range"
			bind:value={framerate}
			min="5"
			max="30"
			step="1"
		/>
		<label for="framerateSlider"> Speed: {framerate}</label>
		<input
			id="foodStockSlider"
			class="slider"
			onchange={resetSimulation}
			type="range"
			bind:value={Parameters.FOOD_STOCK}
			min="1"
			max="100"
			step="1"
		/>
		<label for="foodStockSlider"> Food stock: {Parameters.FOOD_STOCK}</label>
	</Paper>
</main>

<style>
	main {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-m);
		align-items: flex-start;
	}

	.controls {
		display: flex;
		align-items: stretch;
		gap: var(--space-s);
	}

	hr {
		border: none;
		border-top: var(--fieldBorderWidth) solid var(--c-border);
		margin: var(--space-s) 0;
	}

	select {
		font: inherit;
		padding: var(--textFrameY);
		border: var(--fieldBorderWidth) solid var(--c-fieldBorder);
		border-radius: calc(var(--radius) / 2);
		background-color: var(--c-overlay);
		margin-bottom: var(--space-s);
	}

	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 50%;
		height: 20px;
		border-radius: 20px;
		background: #928f99;
		outline: none;
		opacity: 0.7;
		transition: opacity 0.15s ease-in-out;
		margin: 0.5rem;
	}

	.slider:hover {
		opacity: 1; /* Fully shown on mouse-over */
	}

	label {
		font-size: 20px;
		font-weight: bold;
	}
</style>

<script lang="ts">
    import Simulation, { resetSimulation, setFramerate } from '$lib/components/Simulation.svelte'
    import PerformanceMeter from '$lib/components/PerformanceMeter.svelte'
    import Seo from '$lib/components/Seo.svelte'
    import { Button, Divider, Group, NativeSelect, Paper } from '@svelteuidev/core'
    import Parameters from '$lib/simulation/environment/SimulationParameters'

    let running = true
    let framerate = Parameters.FRAMERATE
    let antSlider = 4
    let colorPresets = ['Carpenter Ants', 'Fire Ants']
    let selectedPreset = 'Carpenter Ants'

    $: {
        Parameters.ANT_TYPE = colorPresets.indexOf(selectedPreset)
        resetSimulation()
    }
    $: setFramerate(framerate)
    $: Parameters.ANTS = exponential(antSlider)

    function exponential(position) {
        // position will be between 0 and 100
        var minp = 0
        var maxp = 100

        // The result should be between 5 an 2000
        var minv = Math.log(5)
        var maxv = Math.log(2000)

        // calculate adjustment factor
        var scale = (maxv-minv) / (maxp-minp)

        return Number(Math.exp(minv + scale*(position-minp)).toFixed(0))
    }

    function handleKeydown(event) {
        if (event.code === 'Space') {
            running = !running
            event.preventDefault()
        }
        console.log(event)
	}
</script>

<Seo title="Ant Simulation" 
     keywords="Ants Simulation" 
     type="Website" 
     description="An interactive ant simulation. Thats realy about it. Oh, and we also made a paper about the stuff we learned." 
     image="/social_preview.png"/>

<svelte:window on:keydown={handleKeydown}/>

<main>
    <Simulation {running}/>
    <Paper>
        <Group align="stretch">
            <Button variant="filled" on:click={()=>running = !running}>
                {#if running}
                Pause
                {:else}
                Play
                {/if}
            </Button>
            <Button variant="outline" on:click={resetSimulation}>Reset</Button>
            <PerformanceMeter/>
        </Group>
        <Divider/>
        <NativeSelect aria-label="Color preset" bind:value={selectedPreset} data={colorPresets}/>
        <input id="obstacleCountSlider" class="slider" on:change={resetSimulation} type="range" bind:value={Parameters.OBSTACLE_COUNT} min="0" max="80" step="1"/>
        <label for="obstacleCountSlider"> Obstacle Count: {Parameters.OBSTACLE_COUNT}</label><br/>
        <input id="obstacleSizeSlider" class="slider" on:change={resetSimulation} type="range" bind:value={Parameters.OBSTACLE_SIZE} min="1" max="6" step="1"/>
        <label for="obstacleSizeSlider"> Obstacle Size: {Parameters.OBSTACLE_SIZE}</label><br/>
        <input id="antsCountSlider" class="slider" on:change={resetSimulation} type="range" bind:value={antSlider} min="0" max="100" step="1"/>
        <label for="antsCountSlider"> Ants: {Parameters.ANTS}</label><br/>
        <input id="foodCountSlider" class="slider" on:change={resetSimulation} type="range" bind:value={Parameters.FOOD} min="1" max="80" step="1"/>
        <label for="foodCountSlider"> Food: {Parameters.FOOD}</label>
        <input id="framerateSlider" class="slider" type="range" bind:value={framerate} min="5" max="30" step="1"/>
        <label for="framerateSlider"> Speed: {framerate}</label>
        <input id="foodStockSlider" class="slider" on:change={resetSimulation} type="range" bind:value={Parameters.FOOD_STOCK} min="1" max="100" step="1"/>
        <label for="foodStockSlider"> Food stock: {Parameters.FOOD_STOCK}</label>
    </Paper>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

    * {
        font-family: Nunito, Roboto, system-ui, sans-serif;
    }

    :global(body) {
        padding: var(--space-m);
        margin: 0;
    }

    :global(html) {
        background-color: var(--c-background);
    }

    main {
        display: flex;
        flex-wrap: wrap;

    }

    .slider {
        -webkit-appearance: none;
        width: 50%;
        height: 20px;
        border-radius: 20px;
        background: #928f99;
        outline: none;
        opacity: 0.7;
        -webkit-transition: opacity .15s ease-in-out;
        transition: opacity .15s ease-in-out;
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

<script context="module">
    export const prerender = true;
</script>

<script lang="ts">
    import Simulation, { resetSimulation, setFramerate } from '$lib/components/Simulation.svelte'
    import PerformanceMeter from '$lib/components/PerformanceMeter.svelte'
    import Seo from '$lib/components/Seo.svelte'
    import '@material/mwc-button'
    import Parameters from '$lib/simulation/environment/SimulationParameters'
    import { goto } from '$app/navigation';


    let running = true
    let framerate = Parameters.FRAMERATE
    let antSlider = 4

    $: setFramerate(framerate)
    $: Parameters.ANTS = exponential(antSlider)

    function exponential(position) {
        // position will be between 0 and 100
        var minp = 0;
        var maxp = 100;

        // The result should be between 100 an 10000000
        var minv = Math.log(5);
        var maxv = Math.log(2000);

        // calculate adjustment factor
        var scale = (maxv-minv) / (maxp-minp);

        return Number(Math.exp(minv + scale*(position-minp)).toFixed(0));
    }
</script>

<Seo title="Ant Simulation" keywords="Ants Simulation" type="Website" description="An interactive ant simulation. Thats realy about it. Oh, and we also made a paper about the stuff we learned." image="/social_preview.png"/>

<h1>Ant Simulation</h1>

<main>
    <section aria-label="Simulation">
        <Simulation {running}/>
        <div class="controls">
            <mwc-button raised on:click={()=>running = !running}>
                {#if running}
                    Pause
                {:else}
                    Play
                {/if}
            </mwc-button>
            <mwc-button outlined on:click={resetSimulation}>Reset</mwc-button>
            <PerformanceMeter/>
        </div>
    </section>
    <section aria-label="Ant Descriptions">

        <div class="ant-card">
            <h2 class="card-title">Carpenter Ants</h2>
            <picture>
                <source srcset="carpenter_ant_512.png 1x, carpenter_ant_1024.png 2x, carpenter_ant.png 3x">
                <img class="ant-img" src="carpenter_ant.png" alt="carpenter_ant" width="500" height="500">
            </picture>
            <mwc-button on:click={() => {Parameters.ANT_TYPE = 0; resetSimulation()}} raised>Apply carpenter ants
            </mwc-button>
            <mwc-button on:click={() => goto("/carpenterants")} raised>About</mwc-button>
        </div>
        <div class="ant-card">
            <h2 class="card-title">Fire Ants</h2>
            <picture>
                <source srcset="fire_ant_512.png 1x, fire_ant_1024.png 2x, fire_ant.png 3x">
                <img class="ant-img" src="fire_ant.png" alt="fire_ant" width="500" height="500">
            </picture>
            <mwc-button on:click={() => {Parameters.ANT_TYPE = 1; resetSimulation()}} raised>Apply fire ants
            </mwc-button>
            <mwc-button on:click={() => goto("/fireants")} raised>About</mwc-button>
        </div>
        <form>
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
        </form>
    </section>
</main>
<footer>
    <p>The sources of the texts written on the info pages, can be found in the documentation of the following <a
            href="https://github.com/CediGasser/ant-simulation">GitHub repository</a>.</p>
</footer>
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

    .controls {
        display: flex;
        justify-content: space-around;
        max-width: 1050px;
    }

    .ant-card {
        box-shadow: var(--shadow);
        border-radius: var(--radius);
        padding: var(--space-m);
        margin: var(--space-m);
        min-width: 400px;
        max-width: 600px;
        background-color: white;
    }

    .slider {
        -webkit-appearance: none;
        width: 50%;
        height: 20px;
        border-radius: 20px;
        background: #6c6872;
        outline: none;
        opacity: 0.7;
        -webkit-transition: opacity .15s ease-in-out;
        transition: opacity .15s ease-in-out;
    }

    .slider:hover {
        opacity: 1; /* Fully shown on mouse-over */
    }

    label {
        font-size: 20px;
        font-weight: bold;
    }

    .card-title {
        text-align: center;
    }
    footer {
        position: relative;
        padding: 10px 10px 0px 10px;
        bottom: 0;
        width: 100%;
        /* Height of the footer*/
        height: 40px;
        text-align: center;
    }
</style>

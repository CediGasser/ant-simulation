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
    import carpenterAntImg from '$lib/assets/carpenter_ant.png';
    import fireAntImg from '$lib/assets/fire_ant.png';


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
            <img class="ant-img" src={carpenterAntImg} alt="carpenter_ant">
            <mwc-button on:click={() => {Parameters.ANT_TYPE = 0; resetSimulation()}} raised>Apply carpenter ants
            </mwc-button>
            <mwc-button on:click={() => goto("/carpenterants")} raised>More infos</mwc-button>
        </div>
        <div class="ant-card">
            <h2 class="card-title">Fire Ants</h2>
            <img class="ant-img" src={fireAntImg} alt="fire_ant">
            <mwc-button on:click={() => {Parameters.ANT_TYPE = 1; resetSimulation()}} raised>Apply fire ants
            </mwc-button>
            <mwc-button on:click={() => goto("/fireants")} raised>More infos</mwc-button>
        </div>
        <ul>
            <input name="obstacleCount" class="slider" on:change={resetSimulation} type="range" bind:value={Parameters.OBSTACLE_COUNT} min="0" max="80" step="1"/>
            <label for="obstacleCount"> Obstacle Count: {Parameters.OBSTACLE_COUNT}</label><br/>
            <input name="obstacleSize" class="slider" on:change={resetSimulation} type="range" bind:value={Parameters.OBSTACLE_SIZE} min="1" max="6" step="1"/>
            <label for="obstacleSize"> Obstacle Size: {Parameters.OBSTACLE_SIZE}</label><br/>
            <input name="antsCount" class="slider" on:change={resetSimulation} type="range" bind:value={antSlider} min="0" max="100" step="1"/>
            <label for="antsCount"> Ants: {Parameters.ANTS}</label><br/>
            <input name="foodCount" class="slider" on:change={resetSimulation} type="range" bind:value={Parameters.FOOD} min="1" max="80" step="1"/>
            <label for="foodCount"> Food: {Parameters.FOOD}</label>
            <input name="framerate" class="slider" type="range" bind:value={framerate} min="5" max="30" step="1"/>
            <label for="framerate"> Speed: {framerate}</label>
            <input name="foodStock" class="slider" on:change={resetSimulation} type="range" bind:value={Parameters.FOOD_STOCK} min="1" max="100" step="1"/>
            <label for="foodStock"> Food stock: {Parameters.FOOD_STOCK}</label>
        </ul>
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

    .ant-img {
        width: 100%;
    }
</style>

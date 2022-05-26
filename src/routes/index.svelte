<script lang="ts">
    import Simulation, { resetSimulation } from '$lib/components/Simulation.svelte'
    import PerformanceMeter from '$lib/components/PerformanceMeter.svelte'
    import Seo from '$lib/components/Seo.svelte'
    import '@material/mwc-button'
    import Parameters from '$lib/simulation/environment/SimulationParameters'
    import '@material/mwc-slider/slider-range'

    let running = true

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
            <h2>Fire Ants</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat fugiat ex similique omnis praesentium fuga, repellendus impedit neque voluptatum cumque suscipit sed ducimus unde vero. Culpa ut sit ipsam aspernatur.</p>
            <mwc-button raised>Apply presets</mwc-button>
        </div>
        <div class="ant-card">
            <h2>Carpenter Ants</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat fugiat ex similique omnis praesentium fuga, repellendus impedit neque voluptatum cumque suscipit sed ducimus unde vero. Culpa ut sit ipsam aspernatur.</p>
            <mwc-button raised>Apply presets</mwc-button>
        </div>
        <div class="ant-card">
            <h2>Kidnapper Ants</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat fugiat ex similique omnis praesentium fuga, repellendus impedit neque voluptatum cumque suscipit sed ducimus unde vero. Culpa ut sit ipsam aspernatur.</p>
            <mwc-button raised>Apply presets</mwc-button>
        </div>

        <ul>
            <input class="slider" type="range" bind:value={Parameters.OBSTACLE_COUNT} min="0" max="80" name="OBSTACLE_COUNT" step="1"/>
            <label for="OBSTACLE_COUNT"> Obstacle Count</label><br/>
            <input class="slider" type="range" bind:value={Parameters.OBSTACLE_SIZE} min="1" max="6" name="OBSTACLE_SIZE" step="1"/>
            <label for="OBSTACLE_SIZE"> Obstacle Size</label><br/>
            <input class="slider" type="range" bind:value={Parameters.ANTS}  min="5" max="40" name="ANTS" step="1"/>          
            <label for="ANTS"> Ants</label><br/>
            <input class="slider" type="range" bind:value={Parameters.FOOD} min="1" max="80" name="FOOD" step="1"/>
            <label for="FOOD"> Food</label>
        </ul>
    </section>
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
        max-width: fit-content;
    }

    .slider {
        -webkit-appearance: none;
        width: 65%;
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
</style>

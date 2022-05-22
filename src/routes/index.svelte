<script lang="ts">
    import Simulation, { resetSimulation } from '$lib/components/Simulation.svelte'
    import PerformanceMeter from '$lib/components/PerformanceMeter.svelte'
    import Seo from '$lib/components/Seo.svelte'
    import '@material/mwc-button'

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
</style>

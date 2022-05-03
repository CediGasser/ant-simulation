<script lang="ts">
    import Simulation, { resetSimulation } from '$lib/components/Simulation.svelte'
    import PerformanceMeter from '$lib/components/PerformanceMeter.svelte'
    import Seo from '$lib/components/Seo.svelte'

    let running = true
</script>

<Seo title="Ant Simulation" keywords="Ants Simulation" type="Website" description="An interactive ant simulation. Thats realy about it. Oh, and we also made a paper about the stuff we learned." image="/social_preview.png"/>

<main>
    <div>
        <h1>Ant Simulation</h1>
        <Simulation {running}/>

        <button on:click={()=>running = !running}>
            {#if running}
                Pause
            {:else}
                Play
            {/if}
        </button>
        <button on:click={resetSimulation}>Reset</button>
        <PerformanceMeter/>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
    * {
        font-family: Nunito, Roboto, system-ui, sans-serif;
    }
    main {
        height: 100%;
        padding: 32px;
    }
    button {
        background-color: var(--c-background);
        width: 96px;
        border-radius: 4px;
        border: none;
        box-shadow: var(--shadow);
        margin: 8px;
        height: 32px;
    }
</style>

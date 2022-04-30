<script>
    import PixiSimulation from '$lib/components/PixiSimulation.svelte'
    import PerformanceMeter from '$lib/components/PerformanceMeter.svelte'
    import Seo from '$lib/components/Seo.svelte'

    let antCount = 100
    let antSize = 1
    let playing = false
</script>

<Seo title="Ant Simulation" keywords="Ants Simulation" type="Website" description="An interactive ant simulation. Thats realy about it. Oh, and we also made a paper about the stuff we learned." image="/social_preview.png"/>

<main>
    <div>
        <h1>Ant Simulation</h1>
        <PixiSimulation {antCount} {antSize} {playing}></PixiSimulation>
        <input type="number" bind:value={antCount} max="20000" min="0"/>
        <button on:click={()=>{playing = !playing}}>
            {#if playing}
                Pause
            {:else}
                Play
            {/if}
        </button>
        <PerformanceMeter></PerformanceMeter>
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
        background-color: var(--c-accentContrasted);
    }
    button, input {
        background-color: var(--c-background);
        width: 96px;
        border-radius: 4px;
        border: none;
        box-shadow: var(--shadow);
        margin: 8px;
        height: 32px;
    }
</style>

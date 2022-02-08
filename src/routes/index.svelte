<script>
    import Simulation from "../components/Simulation.svelte"
    import PerformanceMeter from "../components/PerformanceMeter.svelte"

    let antCount = 100
    let antSize = 1
    let playing = false
</script>

<main>
    <div>
        <h1>Ant Simulation</h1>
        <Simulation {antCount} {antSize} {playing}></Simulation>
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
        color: #D9CB6B;
    }
    main {
        display: flex;
        padding: 24px;
        background-color: #0F111A;
    }
    button, input {
        background-color: brown;
        width: 80px;
        border-radius: 4px;
        border: none;
        box-shadow: 4px 4px 8px black;
        margin: 8px; 
    }
</style>

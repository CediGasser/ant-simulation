<script>
    import Slider from "../components/Slider.svelte";
    import Simulation from "../components/Simulation.svelte"
    
    let antCount = 100
    let antSize = 1
    let playing = false
</script>

<main>
    <div>
        <Simulation {antCount} {antSize} {playing}></Simulation>
        <input type="number" bind:value={antCount} max="20000" min="0"/>
        <button on:click={()=>{playing = !playing}}>
            {#if playing}
                Pause
            {:else}
                Play
            {/if}
        </button>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
    * {
        font-family: Nunito, Roboto, system-ui, sans-serif;
    }
    main {
        display: flex;
        padding: 24px;
        color: #D9CB6B;
        background-color: #0F111A;
    }
</style>

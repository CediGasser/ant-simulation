<script lang="ts">
    import { onMount } from "svelte";

    const times = []
    let fps;
    function refreshLoop() {
        window.requestAnimationFrame(() => {
            const now = performance.now()
            while (times.length > 0 && times[0] <= now - 1000) {
                times.shift()
            }
            times.push(now)
            fps = times.length
            refreshLoop()
        })
    }

    onMount(refreshLoop)
</script>

<p>fps: {fps}</p>

<style>
    p {
        text-align: center;
        background-color: var(--c-background);
        width: 96px;
        border-radius: 4px;
        border: none;
        box-shadow: var(--shadow);
        margin: 8px; 
        height: 32px;
    }
</style>
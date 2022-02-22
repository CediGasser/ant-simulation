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
        background-color: brown;
        width: 80px;
        border-radius: 4px;
        text-align: center;
    }
</style>
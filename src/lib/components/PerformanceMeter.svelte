<script lang="ts">
    import { onMount } from "svelte";
    import { Button } from '@svelteuidev/core'

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

<Button variant="light" disabled>fps: {fps}</Button>
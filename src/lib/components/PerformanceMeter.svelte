<script lang="ts">
    import { onMount } from "svelte";
    import '@material/mwc-button'

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

<mwc-button unelevated disabled>fps: {fps}</mwc-button>
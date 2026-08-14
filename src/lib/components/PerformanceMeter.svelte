<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';

	const times: number[] = [];
	let fps = $state(0);

	function refreshLoop() {
		window.requestAnimationFrame(() => {
			const now = performance.now();
			while (times.length > 0 && times[0] <= now - 1000) {
				times.shift();
			}
			times.push(now);
			fps = times.length;
			refreshLoop();
		});
	}

	onMount(refreshLoop);
</script>

<Button variant="outline" disabled>fps: {fps}</Button>

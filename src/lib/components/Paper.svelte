<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div class="paper">
	{@render children?.()}
</div>

<style>
	.paper {
		background-color: var(--c-overlay);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		padding: var(--space-m);
	}
</style>

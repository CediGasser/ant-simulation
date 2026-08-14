<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'filled' | 'outline' | 'light' | 'subtle';
		href?: string;
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
	}

	let { variant = 'filled', href, disabled = false, onclick, children }: Props = $props();
</script>

{#if href}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href is caller-provided and may be external -->
	<a class="button {variant}" {href}>{@render children?.()}</a>
{:else}
	<button class="button {variant}" {disabled} {onclick}>{@render children?.()}</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--textFrameY) var(--textFrameX);
		border: var(--fieldBorderWidth) solid transparent;
		border-radius: calc(var(--radius) / 2);
		font: inherit;
		font-weight: bold;
		text-decoration: none;
		cursor: pointer;
		transition: background-color 0.15s ease-in-out;
	}

	.button:disabled {
		cursor: default;
		opacity: 0.6;
	}

	.filled {
		background-color: var(--c-accent);
		color: var(--c-accentContrasted);
	}

	.filled:hover:not(:disabled) {
		background-color: hsl(var(--accentH), var(--accentS), 25%);
	}

	.outline {
		background-color: transparent;
		border-color: var(--c-accent);
		color: var(--c-accent);
	}

	.outline:hover:not(:disabled) {
		background-color: hsl(var(--accentH), var(--accentS), 92%);
	}

	.light {
		background-color: hsl(var(--accentH), var(--accentS), 88%);
		color: var(--c-accent);
	}

	.subtle {
		background-color: transparent;
		color: var(--c-accent);
	}

	.subtle:hover,
	.light:hover {
		background-color: hsl(var(--accentH), var(--accentS), 84%);
	}
</style>

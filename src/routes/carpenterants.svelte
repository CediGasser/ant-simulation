<script context="module">
    export const prerender = true;
</script>

<script lang="ts">

    import Seo from "$lib/components/Seo.svelte";
    import '@material/mwc-button'
    import {goto} from '$app/navigation';

</script>


<Seo title="Carpenter Ants" keywords="Ants Simulation" type="Website"
     description="An interactive ant simulation. Thats realy about it. Oh, and we also made a paper about the stuff we learned."
     image="/social_preview.png"/>

<main>

    <div style="margin: auto;">
        <br/>
        <mwc-button style="padding-right: 20px;" on:click={() => goto("/")} raised>Back to the ant simulation</mwc-button>
        <mwc-button on:click={() => goto("/fireants")} raised>Fire ants</mwc-button>
    </div>

    <section aria-label="Ant Descriptions">

        <br/>
        <div class="ant-card">
            <h2>Carpenter Ants</h2>
            <p class="info-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat fugiat ex similique
                omnis praesentium fuga, repellendus impedit neque voluptatum cumque suscipit sed ducimus unde vero.
                Culpa ut sit ipsam aspernatur.</p>
            <img class="ant-image" src="src/assets/carpenter_ant.png">
        </div>
    </section>

</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

    * {
        font-family: Nunito, Roboto, system-ui, sans-serif;
    }

    :global(body) {
        padding: var(--space-m);
        margin: auto;
    }

    :global(html) {
        background-color: var(--c-background);
    }

    main {
        display: flex;
        flex-wrap: wrap;
    }


    .ant-card {
        box-shadow: var(--shadow);
        border-radius: var(--radius);
        padding: var(--space-m);
        margin: var(--space-m);
        min-width: 400px;
        max-width: 90%;
        margin: auto;
        background-color: white;
    }

    .info-text {
        font-size: 20pt;
    }

    .ant-image {
        margin: auto;
    }

</style>

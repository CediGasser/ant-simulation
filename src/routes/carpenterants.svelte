<script lang="ts">
    import Seo from '$lib/components/Seo.svelte'
    import { Paper } from '@svelteuidev/core'
</script>


<Seo title="Carpenter Ants" keywords="Ants Simulation" type="Website"
     description="An interactive ant simulation. Thats realy about it. Oh, and we also made a paper about the stuff we learned."
     image="/carpenter_ant_512.png"/>


<Paper>
    <section aria-label="Ant Descriptions">
        <br/>
        <div class="ant-card">
            <h2>Carpenter Ants (Lasius Fuliginosus)</h2>
            <p class="info-text">Carpenter ants are found in Europe and Asia. One colony can have up to two million ants and has
                always more than one Queen, except at the beginning of a new colony.
                They do not have ant hills, but build their comb-like nests inside of deadwood. The ants gnaw
                passageways into the wood and build their nest within those passageways with a substance, mostly
                made out of wood and sugar. To reinforce their nest, they breed a certain mushroom inside the nest.
                Their nutrition consists mainly of a honey-like substance, which the ants collect from aphid colonies.
                If necessary, they supplement their nutrition with insects.
                Because carpenter ants need deadwood and therefore also infest construction wood of buildings,
                they are considered to be vermin.</p>
                <picture>
                    <source srcset="carpenter_ant_512.png 1x, carpenter_ant_1024.png 2x, carpenter_ant.png 3x">
                    <img class="ant-image" src="carpenter_ant.png" alt="carpenter_ant" width="500" height="500">
                </picture>
        </div>
    </section>

</Paper>

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

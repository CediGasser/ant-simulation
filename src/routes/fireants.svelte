<script context="module">
    export const prerender = true;
</script>

<script lang="ts">

    import Seo from "$lib/components/Seo.svelte";
    import '@material/mwc-button'
    import {goto} from '$app/navigation';
    import fireAntImg from '$lib/assets/fire_ant.png';


</script>


<Seo title="Fire Ants" keywords="Ants Simulation" type="Website"
     description="An interactive ant simulation. Thats realy about it. Oh, and we also made a paper about the stuff we learned."
     image="/social_preview.png"/>


<main>
    <div style="margin: auto;">
        <br/>
        <mwc-button style="padding-right: 20px;" on:click={() => goto("/")} raised>Back to the ant simulation</mwc-button>
        <mwc-button on:click={() => goto("/carpenterants")} raised>Carpenter ants</mwc-button>
    </div>
    <section aria-label="Ant Descriptions">
        <br/>
        <div class="ant-card">
            <h2>Fire Ants (Solenopsis Invicta)</h2>
            <p class="info-text">The fire ant is originally found in the tropical regions of Central and South America. But in the 20th
                century, it was imported into the USA. The sub-specie the red imported fire ant was created and
                since then spread to a few other countries such as Australia, China, and Taiwan. The small red ant
                dominated their competitors in their new habitats. That triumph over other ant species is not least
                because of their extremely aggressive behavior and their destructive attack, which is composed of a
                bite and a poisonous injection into the bite wound from their sting. This also earned them their
                scientific name Solenopsis Invicta (the undefeated fire ant). Red fire ants build earthy ant hills under
                which underground constructions are found. The hills can reach up to one meter in height as well as
                in width. The nutrition of the fire ant comprises almost all other insects, as well as seeds, fruits and
                some plants. Besides that the fire ant often almost exterminates other ant species, it also damages
                agriculture. Additionally, they have a penchant for electric devices, which makes them a very
                annoying vermin.
            </p>
            <img class="ant-image" src={fireAntImg} alt="fire_ant">
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

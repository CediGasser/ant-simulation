<script lang="ts">
    import Seo from '$lib/components/Seo.svelte'
    import { Paper } from '@svelteuidev/core'
</script>


<Seo title="Fire Ants" 
     keywords="Ants Simulation" 
     type="Website"
     description="An interactive ant simulation. Thats realy about it. Oh, and we also made a paper about the stuff we learned."
     image="/fire_ant_512.png"/>


<Paper>
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
            <picture>
                <source srcset="fire_ant_512.png 1x, fire_ant_1024.png 2x, fire_ant.png 3x">
                <img class="ant-image" src="fire_ant.png" alt="fire_ant" width="500" height="500">
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

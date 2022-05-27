<script context="module">
    export const prerender = true;
</script>

<script lang="ts">

    import Seo from "$lib/components/Seo.svelte";
    import '@material/mwc-button'
    import {goto} from '$app/navigation';


</script>


<Seo title="Fire Ants" keywords="Ants Simulation" type="Website"
     description="An interactive ant simulation. Thats realy about it. Oh, and we also made a paper about the stuff we learned."
     image="/social_preview.png"/>


<main>
    <div style="margin: auto;">
        <br/>
        <mwc-button style="padding-right: 20px;" on:click={() => window.location.assign("/")} raised>Back to ant
            simulation
        </mwc-button>
        <mwc-button on:click={() => goto("/carpenterants")} raised>Carpenter ants</mwc-button>
    </div>
    <section aria-label="Ant Descriptions">
        <br/>
        <div class="ant-card">
            <h2>Fire Ants</h2>
            <p>The fire ant (genus Solenopsis) is red and black colored and from 1.6 to about 5mm long. The species is
                originally found in the tropical regions Central and South America. In 1920 a descendent was created:
                The red imported fire ant was imported into the USA and spread since then to a few other countrys such
                as Australia, China and Taiwan. This succesful diffusion is not least because of their aggresiv
                behaviour against threatening animals, wihch also earnd them their scientific name Solenopsis invicta
                (the undefeated fire ant). Red fire ants biuld earthy anthills under which underground constructions are
                found. The hills can reach up to one meter in height aswell as in width. They like warm and wet climate,
                which is why their nests are often found near rivers, lakes or watered grasslands.
                The red imported fire ant is especially aggresiv reagarding other ant species. Therefor, the ant has the
                potential to endanger the indigenous environment, because they often allmost exterminate nativ ant
                species. But not only the Fauna suffers under them, they also destroy the Flora and no one can stop them
                because of the dominance over their competitors. Additionally, they have a penchant for electric
                devices, which makes them a very annoying vermin in the garden.
                If attacking, the ant bites the pray with the jaw and afterwards injects poison with its sting, located
                at the abdomen. The ant will launch several attacks within a short period of time. If confronted with
                only one ant, the attack is only dangerous for people with allergic reactions. Its something else
                entirely if a colonie feals thretened, and hundrets of ants are attaking. The consequences of those
                encounters are severe burnings and possibly fatal shock reactions.
                The communication between the ants, as in most ant colonies, is primarely based on odorous substances,
                the so called pheromones. Additonallly, they have the ability to communticate through knocking with
                their legs or stridulation. Stridulation is a form of communication, wihch belongs to the insects, where
                two bodyparts are robed against each other and thereby a sound is created. Those two however have a very
                limited range of a few centimeters.
                A very rare attribute of the fire ant, which has been observed in Texas USA, is a super-colonie: A few
                neighboring ant colonies merged into one big super-colonie. While still having their seperate anthills,
                the colonies stay in close contact and organize thmeselves together.
            </p>

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
    }
</style>

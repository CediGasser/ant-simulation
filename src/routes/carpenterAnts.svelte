<script lang="ts">

    import Seo from "$lib/components/Seo.svelte";
    import '@material/mwc-button'

</script>


<Seo title="Carpenter Ants" keywords="Ants Simulation" type="Website" description="An interactive ant simulation. Thats realy about it. Oh, and we also made a paper about the stuff we learned." image="/social_preview.png"/>

<main>

    <nav style="margin: auto;">
        <br/>
        <mwc-button style="padding-right: 20px;" on:click= {() => window.location.assign("/")} raised>Back to ant simulation</mwc-button>
        <mwc-button on:click= {() => window.location.assign("/fireAnts")} raised>Fire ants</mwc-button>
    </nav>

    <section aria-label="Ant Descriptions">
    
        <br/>
        <div class="ant-card">
            <h2>Carpenter Ants</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat fugiat ex similique omnis praesentium fuga, repellendus impedit neque voluptatum cumque suscipit sed ducimus unde vero. Culpa ut sit ipsam aspernatur.</p>

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
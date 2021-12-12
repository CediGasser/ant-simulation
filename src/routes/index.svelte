<script>
    import Slider from "../components/Slider.svelte";
    import Simulation from "../components/Simulation.svelte"
    
</script>

<main>
    <div>
        <Simulation></Simulation>
        <Slider></Slider>
    </div>
    <div id="documentation">
        <h1>This site is under construction!</h1>
        <p>You may show up later at some point.</p>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   
        </p>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
    * {
        font-family: Nunito, Roboto, system-ui, sans-serif;
    }
    main {
        display: flex;
        padding: 24px;
        justify-content: center;
        color: #D9CB6B;
        background-color: #0F111A;
    }

    #documentation {
        width: 600px;
    }
</style>

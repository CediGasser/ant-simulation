<script lang="ts">
    import { onMount } from 'svelte'
    import Two from 'two.js'

    // internal
    let twoDiv: HTMLElement
    let two
    let ants = []

    // external
    let antCount = 100
    let antSize = 5
    export {antCount, antSize}

    $: {
        console.log("triggered")
        if (!two) {

        }
        else if (ants.length === 0) {
            for (let i = 0; i < antCount; i++) {
                let newAnt = two.makeCircle(getRandTo(two.width), getRandTo(two.width), antSize)
                newAnt.fill = 'rgb(255, 255, 255)'
                newAnt.noStroke()
                ants.push(newAnt)
            }
        }
        else if (ants.length > 0) {
            let diff = ants.length - antCount
            if (diff > 0) {
                for (let i = 0; i < diff; i++) {
                    ants.shift().remove()
                }
            }
            if (diff < 0) {
                for (let i = 0; i < -diff; i++) {
                    let newAnt = two.makeCircle(getRandTo(two.width), getRandTo(two.width), antSize)
                    newAnt.fill = 'rgb(255, 255, 255)'
                    newAnt.noStroke()
                    ants.push(newAnt)
                }
            }
        }
    }

    let getRandTo = (max: number) => {
        return Math.random() * max
    }

    let update = () => {
        for (let ant of ants) {
            ant.position.x += getRandTo(2) - 1
            ant.position.y += getRandTo(2) - 1
        }
    }

    onMount(() => {
        two = new Two({
            width: 640,
            height: 640,
            type: Two.Types.webgl
        }).appendTo(twoDiv)

        two.bind('update', update)
        two.play()
    })
</script>

<div bind:this={twoDiv}/>

<style>
    div {
        width: 640px;
        height: 640px;
        background-color: brown;
        border-radius: 24px;
        padding: 8px
    }
</style>
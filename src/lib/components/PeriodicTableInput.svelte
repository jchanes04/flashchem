<script lang="ts">
    import type { PtableElementInfo } from "$lib/client";

    import elements from "$lib/functions/client/periodicTableElements"
    import { createEventDispatcher } from "svelte";
    import PeriodicTableElement from "./PeriodicTableElement.svelte";

    export let showFBlock = false
    export let defaultFontSize = 14.122 * Math.pow(Math.E, window.innerWidth / 1616.844) - 7.48178

    const dispatch = createEventDispatcher()

    let ptableFontSize = defaultFontSize
    $: console.log(ptableFontSize)
    let elementsShown = showFBlock
        ? elements
        : [...elements.slice(0, 56), ...elements.slice(71, 88), ...elements.slice(103)]

    let clickDisabled = false
    let selectedElement: string = null

    let lastWindowDimensions: [number, number] = [window.innerWidth, window.innerHeight]

    function createAnswerHandler(e: PtableElementInfo) {
        return () => {
            if (!clickDisabled && !dragging) {
                dispatch('answer', { selectedElement: e.atomicNumber })
                selectedElement = e.atomicNumber
            }
        }
    }

    type Position = { x: number, y: number }
    let startMousePos: Position = null
    let mousePos: Position = null
    let dragging = false
    let inputWrapperElement: HTMLElement

    function handleMousedown(e: MouseEvent) {
        mousePos = { x: e.clientX, y: e.clientY }
        startMousePos = { x: e.clientX, y: e.clientY }

        inputWrapperElement.addEventListener('mousemove', handleMousemove)
        window.addEventListener('mouseup', handleMouseup)
    }

    function handleMousemove(e: MouseEvent) {
        const dx = e.clientX - mousePos.x
        const dy = e.clientY - mousePos.y

        dragging = dragging || getDist(startMousePos, mousePos) > 50

        inputWrapperElement.scrollLeft -= dx
        inputWrapperElement.scrollTop -= dy
        
        mousePos = { x: e.clientX, y: e.clientY }
    }

    function handleMouseup() {
        mousePos = null
        setTimeout(() => {
            dragging = false
        }, 20)

        inputWrapperElement.removeEventListener('mousemove', handleMousemove)
        window.removeEventListener('mouseup', handleMouseup)
    }

    function getDist(p1: Position, p2: Position) {
        return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)
    }

    function handleResize() {
        ptableFontSize *= (window.innerWidth + window.innerHeight)/(lastWindowDimensions[0] + lastWindowDimensions[1])
        lastWindowDimensions = [window.innerWidth, window.innerHeight]
    }

    export function triggerDelay() {
        console.log('d')
        clickDisabled = true
        setTimeout(() => {
            clickDisabled = false
            selectedElement = null
        }, 1000)
    }
</script>

<svelte:window on:resize={handleResize}></svelte:window>

<div class="outer-wrapper">
    <div class="input-wrapper" style="--ptable-font-size: {ptableFontSize}px"
        bind:this={inputWrapperElement} class:dragging on:mousedown={handleMousedown}>
        <div class="periodic-table-input" class:f-block={showFBlock}>
            {#each elementsShown as e}
                <PeriodicTableElement {...e} on:click={createAnswerHandler(e)} {dragging} {clickDisabled} selected={selectedElement === e.atomicNumber && clickDisabled} />
            {/each}
        </div>
    </div>
    <div class="buttons">
        <button on:click={() => ptableFontSize *= 1.07}>+</button>
        <button on:click={() => ptableFontSize /= 1.07}>-</button>
    </div>
</div>

<style lang="scss">
    .outer-wrapper {
        max-width: 100vw;
        overflow: hidden;
        position: relative;
        margin: 0 min(10%, 3em);
        user-select: none;
    }

    .input-wrapper {
        overflow: auto;
        overscroll-behavior: contain;
        max-height: 100%;
    }

    .periodic-table-input {
        margin: auto;
        display: grid;
        grid-template-rows: repeat(7, 1fr);
        grid-template-columns: repeat(18, 1fr);
        color: var(--text-light);
        width: min-content;
        padding: 2em;
    }

    .dragging :global(*) {
        cursor: grabbing !important;
    }

    .f-block {
        grid-template-rows: repeat(7, 1fr) 0.5fr repeat(2, 1fr);
    }

    .buttons {
        position: absolute;
        top: 5px;
        right: 18px;
        font-weight: bold;

        button {
            background: rgba(0, 0, 0, 0.5);
            color: var(--text-light);
            border: none;
            font-size: 2em;
            width: 3ch;
            cursor: pointer;
        }

        :first-child {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }

        :last-child {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    }

    @media (max-width: 650px) {
        .buttons button {
            font-size: 1.5em;
        }
    }

    @media (max-height: 620px) {
        .outer-wrapper {
            margin: 0;
        }
    }
</style>
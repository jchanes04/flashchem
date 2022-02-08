<script lang="ts">
import type { PtableElementInfo } from "$lib/client";

    import elements from "$lib/functions/client/periodicTableElements"
    import { createEventDispatcher } from "svelte";
    import PeriodicTableElement from "./PeriodicTableElement.svelte";

    export let showFBlock = false
    export let defaultFontSize = 20

    const dispatch = createEventDispatcher()

    let ptableFontSize = defaultFontSize
    let elementsShown = showFBlock
        ? elements
        : [...elements.slice(0, 56), ...elements.slice(71, 88), ...elements.slice(103)]

    let clickDisabled = false

    function createAnswerHandler(e: PtableElementInfo) {
        return () => {
            if (!clickDisabled) {
                dispatch('answer', { selectedElement: e.atomicNumber })
                clickDisabled = true
                setTimeout(() => {
                    clickDisabled = false
                }, 500)
            }
        }
    }

    type Position = { x: number, y: number }
    let mousePos: Position = null
    let inputWrapperElement: HTMLElement

    function handleMousedown(e: MouseEvent) {
        mousePos = { x: e.clientX, y: e.clientY }

        inputWrapperElement.addEventListener('mousemove', handleMousemove)
        inputWrapperElement.addEventListener('mouseup', handleMouseup)
    }

    function handleMousemove(e: MouseEvent) {
        const dx = e.clientX - mousePos.x
        const dy = e.clientY - mousePos.y

        inputWrapperElement.scrollLeft -= dx
        inputWrapperElement.scrollTop -= dy
        
        mousePos = { x: e.clientX, y: e.clientY }

        inputWrapperElement.style.cursor = "grabbing"
    }

    function handleMouseup() {
        mousePos = null

        inputWrapperElement.style.cursor = "default"

        inputWrapperElement.removeEventListener('mousemove', handleMousemove)
        inputWrapperElement.removeEventListener('mouseup', handleMouseup)
    }
</script>

<div class="outer-wrapper">
    <div class="input-wrapper" style="--ptable-font-size: {ptableFontSize}px"
        bind:this={inputWrapperElement} on:mousedown={handleMousedown}>
        <div class="periodic-table-input" class:f-block={showFBlock}>
            {#each elementsShown as e}
                <PeriodicTableElement {...e} on:click={createAnswerHandler(e)} {clickDisabled} />
            {/each}
        </div>
    </div>
    <div class="buttons">
        <button on:click={() => ptableFontSize *= 1.15}>+</button>
        <button on:click={() => ptableFontSize /= 1.15}>-</button>
    </div>
</div>

<style lang="scss">
    .outer-wrapper {
        position: relative;
        width: 100%;
        height: 40vh;
    }
    
    .input-wrapper {
        overflow: auto;
        overscroll-behavior: contain;
    }

    .periodic-table-input {
        display: grid;
        grid-template-rows: repeat(7, 1fr);
        grid-template-columns: repeat(18, 1fr);
        color: var(--text-light);
        width: min-content;
        padding: 2em;
    }

    .f-block {
        grid-template-rows: repeat(7, 1fr) 0.5fr repeat(2, 1fr);
    }

    .buttons {
        position: absolute;
        top: 5px;
        right: 5px;
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
</style>
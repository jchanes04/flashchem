<script lang="ts">
import type { SetInfo } from "$lib/client";

    import practiceOptions from "$lib/stores/practiceOptions";

    import { createEventDispatcher } from "svelte";

    export let atomicNumber: string
    export let symbol: string
    export let atomicMass: string
    export let gridX: number
    export let gridY: number
    export let dragging = false
    export let clickDisabled = false

    export let selected = false

    $: selectedSet = $practiceOptions.selectedSet as SetInfo<"place">

    const dispatch = createEventDispatcher()

    function handleClick() {
        dispatch('click')
    }
</script>

<div class="ptable-element" class:dragging style="grid-column-start: {gridX}; grid-row-start: {gridY}"
    on:click={handleClick} class:selected class:clickDisabled>
    <p class="atomic-number" class:hidden={selectedSet.options.hideAtomicNumber ?? true}>{atomicNumber}</p>
    <p class="atomic-symbol" class:hidden={selectedSet.options.hideAtomicSymbol ?? true}>{symbol}</p>
    <p class="atomic-mass" class:hidden={selectedSet.options.hideAtomicMass ?? true}>{atomicMass}</p>
</div>

<style lang="scss">
    .ptable-element {
        font-size: var(--ptable-font-size, 20px);
        text-align: center;
        border: 1px solid var(--text-light);
        width: 1.75em;
        padding: 0.125em 0.3em;
        margin: auto;
        cursor: pointer;
        user-select: none;
    }

    .ptable-element:hover:not(.dragging) {
        background-color: rgba(255,255, 255, 0.1);

        &.selected {
            background-color: transparentize(#B83D49, 0.3);

            .atomic-symbol {
                color: #51B6F5; 
            }
        }
    }

    .ptable-element:hover:not(.dragging) .atomic-symbol {
        color: #51B6F5;
    }

    .atomic-number {
        font-size: 0.5em;
        margin: 0.15em 0 0;
    }

    .atomic-symbol {
        font-size: 1.125em;
        margin: 0 0 0.1em;
        color: #FF9B54;
        line-height: 1em;
    }

    .atomic-mass {
        font-size: 0.375em;
        margin: 0.075em 0;
    }

    .selected {
        background-color: transparentize(#B83D49, 0.3);
        
        .atomic-symbol {
            color: #51B6F5;
        }
    }

    .hidden {
        visibility: hidden;
    }

    .clickDisabled:not(.selected) > * {
        opacity: 0.6;
    }
</style>
<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let atomicNumber: string
    export let symbol: string
    export let atomicMass: string
    export let gridX: number
    export let gridY: number
    export let clickDisabled = false
    export let dragging = false
    export let options: {
        hideAtomicNumber: boolean,
        hideSymbol: boolean,
        hideAtomicMass: boolean
    } = {
        hideAtomicNumber: false,
        hideSymbol: false,
        hideAtomicMass: false
    }

    let selected = false

    const dispatch = createEventDispatcher()

    function handleClick() {
        dispatch('click')
        if (!clickDisabled && !dragging) {
            selected = true
            setTimeout(() => {
                selected = false
            }, 500)
        }
    }
</script>

<div class="ptable-element" class:dragging style="grid-column-start: {gridX}; grid-row-start: {gridY}"
    on:click={handleClick} class:selected>
    <p class="atomic-number" class:hidden={options.hideAtomicNumber}>{atomicNumber}</p>
    <p class="atomic-symbol" class:hidden={options.hideSymbol}>{symbol}</p>
    <p class="atomic-mass" class:hidden={options.hideAtomicMass}>{atomicMass}</p>
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
            background-color: transparentize(#B83D49, 0.6);

            .atomic-symbol {
                color: #51B6F5; 
            }
        }
    }

    .ptable-element:hover:not(.dragging) .atomic-symbol {
        color: #51B6F5;
    }

    .atomic-number {
        font-size: 0.625em;
        margin: 0.2em 0 0;
    }

    .atomic-symbol {
        font-size: 1.125em;
        margin: 0.1em 0;
        color: #FF9B54;
        line-height: 1em;
    }

    .atomic-mass {
        font-size: 0.5em;
        margin: 0.1em 0;
    }

    .selected {
        background-color: transparentize(#B83D49, 0.6);
        
        .atomic-symbol {
            color: #51B6F5;
        }
    }

    .hidden {
        visibility: hidden;
    }
</style>
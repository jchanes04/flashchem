<script lang="ts">
    import { setsList } from '$lib/functions/client/setsList';
    import Select from 'svelte-select'
    import loadSets from '$lib/functions/client/loadSets';

    const groupBy = item => item.difficulty
    function handleSelect(e) {
        if (e.detail === 'search') {
            searching = true
            setName = undefined
        } else {
            setName = e.detail
        }
    }
    const getOptionLabel = (option) => option.name;
    const getSelectionLabel = (option) => option.name;

    let searching = false
    let setName = undefined
</script>

<div id="practice-options">
    <h1>Practice Options</h1>
    <div class="setting">
        <h2>Practice Set</h2>
        <div class="set-select-wrapper" class:hidden={searching}>
            <Select items={[...setsList(), {
                type: 'other',
                name: 'Search for more sets',
                value: 'search'
            }]} {groupBy} on:select={handleSelect} on:clear={() => setName = undefined} />
        </div>
        {#if searching}
            <Select loadOptions={loadSets} optionIdentifier="id" {getSelectionLabel} {getOptionLabel} placeholder="Search for sets" />
        {/if}
    </div>
</div>

<style lang="scss">
    #practice-options {
        background: var(--background-3);
        border-radius: 15px;
        padding: 1.5em;
    }
</style>
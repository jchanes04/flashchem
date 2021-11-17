<script lang="ts">
    import { setsList } from '$lib/functions/client/setsList';
    import Select from 'svelte-select'
    import Slider from 'svelte-range-slider-pips'
    import loadSets from '$lib/functions/client/loadSets';
    import type { PracticeMode, SetInfo } from '$lib/client';
    import { timeFormatter } from './PracticeOptions';

    const groupBy = item => item.difficulty
    function handleSelect(e) {
        if (e.detail === 'search') {
            searching = true
            setName = undefined
        } else {
            setName = e.detail
        }
    }
    function handleClear() {
        searching = false
        setName = undefined
        selectedSet = undefined
    }
    const getOptionLabel = (option) => option.name;
    const getSelectionLabel = (option) => option.name;

    let searching = false
    let setName = undefined
    let selectedSet: SetInfo = undefined

    let practiceMode: PracticeMode = "timed"
    let lengthMode: "timed" | "fixed-questions" = "timed"
    function setLengthMode(practiceMode: PracticeMode) {
        if (practiceMode === "timed" || practiceMode === "fixed-questions")
            lengthMode = practiceMode
    }
    $: setLengthMode(practiceMode)

    let practiceTime = 2
    let practiceQuestions = 25
</script>

<div id="practice-options">
    <h1>Practice Options</h1>
    <div class="setting">
        <h2>Practice Set</h2>
        <div class="select-wrapper">
            <div class="set-select-wrapper" class:hidden={searching}>
                <Select items={[...setsList(), {
                    type: 'other',
                    name: 'Search for more sets',
                    id: 'search'
                }]} {groupBy} optionIdentifier="id" labelIdentifier="name" showChevron={true}
                on:select={handleSelect} on:clear={handleClear} />
            </div>
            {#if searching}
                <Select placeholder="Search for sets" optionIdentifier="id" 
                    on:select={handleSelect} on:clear={handleClear}
                    loadOptions={loadSets} {getSelectionLabel} {getOptionLabel} />
            {/if}
        </div>
    </div>
    <div class="setting">
        <h2>Mode</h2>
        <label for="timed-input">
            <input id="timed-input" type="radio" name="practice-mode" value="timed" bind:group={practiceMode} checked />
            <span />
            Timed
        </label>
        <label for="fixed-questions-input">
            <input id="fixed-questions-input" type="radio" name="practice-mode" value="fixed-questions" bind:group={practiceMode} />
            <span />
            Fixed questions
        </label>
        <label for="streak-input">
            <input id="streak-input" type="radio" name="practice-mode" value="streak" bind:group={practiceMode} />
            <span />
            Streak
        </label>
        <label for="infinite-input">
            <input id="infinite-input" type="radio" name="practice-mode" value="infinite" bind:group={practiceMode} />
            <span />
            Infinite
        </label>
    </div>
    <div class="setting" class:grayed={practiceMode === "infinite" || practiceMode === "streak"}>
        <h2>Length</h2>
        <div class="slider">
            {#if lengthMode === "timed"}
                <Slider values={[2]} min={1} max={6} pips all="label" springValues={{ stiffness: 0.12, damping: 0.55 }} formatter={timeFormatter} />
            {:else if lengthMode === "fixed-questions"}
                <Slider values={[25]} min={5} max={50} pips step={5} all="label" springValues={{ stiffness: 0.12, damping: 0.55 }} />
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    #practice-options {
        background: var(--background-3);
        border-radius: 15px;
        padding: 1.5em;
        color: var(--text-light);
        width: min(700px, 80vw);
    }

    h1 {
        font-size: 32px;
        text-align: center;
    }

    h2 {
        font-size: 24px;
        font-weight: 500;
        margin-left: 1.5em;
        margin-bottom: 0.25em;
        text-decoration: underline;
    }

    .select-wrapper {
        width: min(90%, 45ch);
        font-size: 18px;
    }

    label {
        cursor: pointer;
        margin-top: 1em;
        display: block;
        font-size: 18px;
        color: var(--text-light);

        input {
            visibility: hidden;
            width: 0;
            height: 0;
        }

        span {
            width: 1em;
            height: 1em;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            background: var(--background-1);
            vertical-align: text-bottom;
            margin-right: 0.3em;
            margin-bottom: 0.1em;

            &::after {
                content: '';
                position: absolute;
                display: none;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 0.6em;
                height: 0.6em;
                border-radius: 0.3em;
                background: var(--emph);
            }
        }

        input:checked ~ span::after {
            display: inline-block;
        }
    }

    .grayed {
        opacity: 0.5;
        filter: blur(0.6px);
        pointer-events: none;
        user-select: none;
    }
</style>
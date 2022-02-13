<script lang="ts">
    import { setsList } from '$lib/functions/client/setsList';
    import Select from 'svelte-select'
    import Slider from 'svelte-range-slider-pips'
    import loadSets from '$lib/functions/client/loadSets';
    import type { SetInfo } from '$lib/client';
    import { indexToTime, timeFormatter, timeHandleFormatter } from './PracticeOptions';
    import { session } from '$app/stores';
    import { createEventDispatcher, tick } from 'svelte';
    import SelectedSet from './SelectedSet.svelte';
    import type { PracticeMode } from '$lib/global';

    const groupBy = item => item.difficulty
    async function handleSelect(e) {
        if (e.detail.id === 'search') {
            selectedSet = undefined
            await tick();
            searching = true
        } else {
            selectedSet = e.detail
            await tick()
            searching = false
        }
    }
    function handleClear() {
        searching = false
        selectedSet = undefined
    }
    const getOptionLabel = (option) => option.name;
    const getSelectionLabel = (option) => option.name;
    function handleSearchSelect(e) {
        selectedSet = e.detail
        setSelectValue = undefined
    }

    let searching = false
    let selectedSet: SetInfo = undefined
    let setSelectValue = undefined

    let practiceMode: PracticeMode = "timed"
    let lengthMode: "timed" | "fixed-questions" = "timed"
    function setLengthMode(practiceMode: PracticeMode) {
        if (practiceMode === "timed" || practiceMode === "fixed-questions")
            lengthMode = practiceMode
    }
    $: setLengthMode(practiceMode)

    let practiceTime = 2
    let practiceQuestions = 20

    function handleTimeChange(e: CustomEvent) {
        const { value } = e.detail
        practiceTime = value
    }

    function handleQuestionNumberChange(e: CustomEvent) {
        const { value } = e.detail
        practiceQuestions = value
    }

    let postScore = true

    $: startDisabled = !(selectedSet && practiceMode && (practiceTime || practiceQuestions))
    $: scoreboardEnabled = practiceMode === "timed"
        ? [0, 2, 5].includes(practiceTime)
        : practiceMode === "fixed-questions"
            ? [20, 35, 50].includes(practiceQuestions)
            : practiceMode === "streak"

    const dispatch = createEventDispatcher()
    function startPractice() {
        dispatch('start', {
            selectedSet,
            practiceMode,
            practiceTime: practiceMode === "timed" ? indexToTime(practiceTime) : null,
            practiceQuestions: practiceMode === "fixed-questions" ? practiceQuestions : null,
            postScore: postScore && $session.loggedIn && scoreboardEnabled
        })
    }
</script>

<div id="practice-options">
    <h1>Practice Options</h1>
    <div class="setting">
        <h2>Practice Set</h2>
        <div class="select-wrapper">
            <div class="set-select-wrapper" class:hidden={searching}>
                <Select items={[...setsList(), 
                    // {
                    //     type: 'other',
                    //     name: 'Search for more sets',
                    //     id: 'search'
                    // }
                ]} {groupBy} optionIdentifier="id" labelIdentifier="name" showChevron={true} placeholder="Choose a Set"
                on:select={handleSelect} on:clear={handleClear} bind:value={setSelectValue} />
            </div>
            {#if searching}
                <Select placeholder="Search for sets" optionIdentifier="id" noOptionsMessage="No Sets Found"
                    on:select={handleSearchSelect} on:clear={handleClear}
                    loadOptions={loadSets} {getSelectionLabel} {getOptionLabel} />
            {/if}
        </div>

        {#if selectedSet}
            <SelectedSet {selectedSet} />
        {/if}
    </div>
    <div class="setting">
        <h2>Mode</h2>
        <label class="radio" for="timed-input">
            <input id="timed-input" type="radio" name="practice-mode" value="timed" bind:group={practiceMode} checked />
            <span />
            Timed
        </label>
        <label class="radio" for="fixed-questions-input">
            <input id="fixed-questions-input" type="radio" name="practice-mode" value="fixed-questions" bind:group={practiceMode} />
            <span />
            Fixed questions
        </label>
        <label class="radio" for="streak-input">
            <input id="streak-input" type="radio" name="practice-mode" value="streak" bind:group={practiceMode} />
            <span />
            Streak
        </label>
        <label class="radio" for="infinite-input">
            <input id="infinite-input" type="radio" name="practice-mode" value="infinite" bind:group={practiceMode} />
            <span />
            Infinite
        </label>
    </div>
    <div class="setting" class:grayed={practiceMode === "infinite" || practiceMode === "streak"}>
        <h2>Length</h2>
        <div class="slider">
            {#if lengthMode === "timed"}
                <Slider values={[practiceTime]} min={0} max={5} pips all="label" float
                    formatter={timeFormatter} handleFormatter={timeHandleFormatter}
                    springValues={{ stiffness: 0.12, damping: 0.55 }}
                    on:change={handleTimeChange} />
            {:else if lengthMode === "fixed-questions"}
                <Slider values={[practiceQuestions]} min={5} max={50} pips step={5} all="label"
                springValues={{ stiffness: 0.12, damping: 0.55 }}
                on:change={handleQuestionNumberChange} />
            {/if}
        </div>
    </div>
    {#if $session.loggedIn}
        <div class="setting" class:grayed={!scoreboardEnabled}>
            <h2>Scoreboard</h2>
            <label class="checkbox" for="post-score-input">
                <input id="post-score-input" type="checkbox" name="post-score" bind:checked={postScore} />
                <span />
                Post my score to the leaderboards
            </label>
        </div>
    {/if}
    <div class="button-wrapper">
        <button disabled={startDisabled} on:click={startPractice}>Start Practice</button>
    </div>
</div>

<style lang="scss">
    #practice-options {
        background: var(--background-3);
        border-radius: 15px;
        padding: 1.5em;
        color: var(--text-light);
        width: min(700px, 80vw);
        max-height: 70vh;
        overflow-y: auto;
        overflow-x: hidden;
    }

    h1 {
        font-size: 36px;
        text-align: center;
    }

    h2 {
        font-size: 26px;
        font-weight: 500;
        margin-left: 1.5em;
        margin-bottom: 0.25em;
        margin-top: 1em;
        text-decoration: underline;
    }

    .select-wrapper {
        width: min(90%, 45ch);
        font-size: 18px;
        margin-top: 0.75em;
        margin-left: 0.75em;

        --background: var(--background-1);
        --border: none;
        --list-background: var(--background-1);
        --item-is-active-bg: var(--button-1);
        --item-hover-bg: var(--button-1-hover);
        --item-hover-color: var(--text-dark);
        --input-color: var(--text-light);
    }

    .hidden {
        position: absolute;
        visibility: none;
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

    label.radio span {
        border-radius: 50%;

        &::after {
            border-radius: 0.3em;
        }
    }

    label.checkbox span {
        border-radius: 25%;

        &::after {
            border-radius: 0.15em;
        }  
    }

    .slider {
        margin: 2em 0.5em;

        --range-slider: var(--background-1);
        --range-handle: var(--background-2);
        --range-handle-inactive: var(--range-handle);
        --range-handle-focus: var(--range-handle);
        --range-pip-text: var(--text-light);
        --range-pip-active-text: var(--emph);
        --range-pip-hover: var(--text-light);
        --range-pip: var(--text-light);
        --range-pip-active: var(--text-light);
    }

    :global(.rangePips) {
        color: var(--text-light); 
    }

    .grayed {
        opacity: 0.5;
        filter: blur(0.6px);
        pointer-events: none;
        user-select: none;
    }

    .button-wrapper {
        margin-top: 4em;
        text-align: right;

        button {
            background: var(--button-1);
            border-radius: 10px;
            font-size: 24px;
            font-weight: 600;
            border: none;
            padding: 0.5em 1em;
            margin-right: 0.5em;
            color: var(--text-dark);
            cursor: pointer;

            &:hover {
                background: var(--button-1-hover);
            }

            &:disabled {
                opacity: 0.5;
                cursor: default;

                &:hover {
                    background: var(--button-1);
                }
            }
        }
    }

    @media (max-width: 500px) {
        .select-wrapper {
            width: 100%;
            font-size: 14px;
        }

        .slider {
            margin: 2em 0;
        }

        .button-wrapper {
            text-align: center;

            button {
                float: none;
                margin-right: 0;
            }
        }
    }
</style>
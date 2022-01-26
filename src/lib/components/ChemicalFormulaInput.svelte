<script lang="ts">
    import toSubscript from "$lib/functions/client/toSubscript";

    import toSuperscript from "$lib/functions/client/toSuperscript";

    type FormulaSection = {
        startIndex: number,
        endIndex: number,
        content: string,
        type: "normal" | "superscript" | "subscript"
    }

    let inputValue = ""
    let inputElement: HTMLInputElement
    let sections: FormulaSection[] = [{
        startIndex: 0,
        endIndex: 0,
        content: "",
        type: "normal"
    }]
    let contentLength = 0
    let cursorPosition = 0

    let selection = [0, 0]
    
    function getSelection() {
        selection = [inputElement.selectionStart, inputElement.selectionEnd]
        console.log(getCursorCoordinates())
        // console.log(selection)
    }

    const endNumberRegex = /([0-9]*)$/

    const handleInput: (e: Event) => {} = function(e: InputEvent) {
        const cursorCoordinates = getCursorCoordinates()
        const currentSection = sections[cursorCoordinates[0]]
        if (currentSection.type === "normal") {
            if (e.data === "+") {
                if (currentSection.content[cursorCoordinates[1] - 1] !== " ") {
                    if (cursorCoordinates[1] == 0) {
                        sections = [
                            ...sections.slice(0, cursorCoordinates[0]),
                            {
                                startIndex: currentSection.startIndex,
                                endIndex: currentSection.startIndex + 1,
                                type: "superscript",
                                content: "+"
                            },
                            {
                                startIndex: currentSection.startIndex + 2,
                                endIndex: currentSection.endIndex + 2,
                                type: "normal",
                                content: currentSection.content
                            },
                            ...sections.slice(cursorCoordinates[0] + 1).map(s => {
                                return {
                                    startIndex: s.startIndex + 2,
                                    endIndex: s.endIndex + 2,
                                    type: s.type,
                                    content: s.content
                                }
                            })
                        ]
                    } else {
                        sections = [
                            ...sections.slice(0, cursorCoordinates[0]),
                            {
                                startIndex: currentSection.startIndex,
                                endIndex: currentSection.startIndex + cursorCoordinates[1],
                                type: "normal",
                                content: currentSection.content.slice(0, cursorCoordinates[1])
                            },
                            {
                                startIndex: currentSection.startIndex + cursorCoordinates[1] + 1,
                                endIndex: currentSection.startIndex + cursorCoordinates[1] + 2,
                                type: "superscript",
                                content: "+"
                            },
                            {
                                startIndex: currentSection.startIndex + cursorCoordinates[1] + 3,
                                endIndex: currentSection.endIndex + 3,
                                type: "normal",
                                content: currentSection.content.slice(cursorCoordinates[1])
                            },
                            ...sections.slice(cursorCoordinates[0] + 1).map(s => {
                                return {
                                    startIndex: s.startIndex + 2,
                                    endIndex: s.endIndex + 2,
                                    type: s.type,
                                    content: s.content
                                }
                            })
                        ]
                    }
                    contentLength++
                }
            } else {
                currentSection.content = currentSection.content + e.data
                currentSection.endIndex++
                cursorPosition++
                contentLength++
            }
        } else if (currentSection.type === "superscript") {
            if ("1234567890+-".includes(e.data)) {

            }
        }

        updateInput()
        console.dir(sections)
    } as ((e: Event) => {})

    function updateInput() {
        let newInputValue = ""
        for (const s of sections) {
            if (s.type === "normal") {
                newInputValue += s.content
            } else if (s.type === "subscript") {
                newInputValue += toSubscript(s.content)
            } else if (s.type === "superscript") {
                newInputValue += toSuperscript(s.content)
            }
        }
        inputValue = newInputValue
    }

    function getCursorCoordinates() {
        let sectionsBefore = 0
        for (const s of sections) {
            if (s.startIndex - sectionsBefore < selection[0]) {
                sectionsBefore++
            } else {
                break
            }
        }

        if (sectionsBefore > 0) sectionsBefore--

        return [sectionsBefore, selection[0] - (sections[sectionsBefore].startIndex - sectionsBefore)]
    }
</script>

<input type="text" bind:value={inputValue} on:input={handleInput} bind:this={inputElement}
    on:keydown={getSelection} on:keyup={getSelection} on:mousedown={getSelection} on:mouseup={getSelection} />

<style>
    input {
        font-size: 28px;
        user-select: none;
    }
</style>
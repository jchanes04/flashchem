import type { PracticeStats } from "$lib/client";
import { writable, Writable } from "svelte/store";

const practiceStats: Writable<PracticeStats> = writable({
    questionNumber: 1,
    numberCorrect: 0
})
export default practiceStats
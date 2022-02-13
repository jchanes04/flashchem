import type { PracticeOptions } from "$lib/client";
import { Writable, writable } from "svelte/store";

const practiceOptions: Writable<PracticeOptions | null> = writable(null)
export default practiceOptions
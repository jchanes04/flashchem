import type { LeaderboardName, PracticeLength, PracticeMode } from "$lib/global";

export default function getLeaderboardName<T extends "timed" | "fixed-questions" | "streak">(practiceMode: T, practiceLength: PracticeLength<T>): LeaderboardName<T> {
    return `${practiceMode}-${practiceLength}` as LeaderboardName<T>
}
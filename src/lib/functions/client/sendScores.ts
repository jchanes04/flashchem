import type { PracticeOptions } from "$lib/client";
import type { PracticeLength, UserScore } from "$lib/global";
import getLeaderboardName from "./getLeaderboardName";

export default async function sendScores<T extends "timed" | "fixed-questions" | "streak">(score: number, userId: string, options: PracticeOptions, practiceLength: PracticeLength<T>, count: number = 0) {
    const postRes = await fetch('/api/score', {
        method: "POST",
        body: JSON.stringify({
            score,
            userId: userId,
            setId: options.selectedSet.id,
            leaderboardName: getLeaderboardName(options.practiceMode, practiceLength)
        })
    })

    if (postRes.status !== 201) {
        if (count < 5) {
            await new Promise((res) => setTimeout(res, 500 * count))
            return await sendScores(score, userId, options, practiceLength, count + 1)
        } else {
            return true
        }
    } else {
        return false
    }
}
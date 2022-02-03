export function calculateTimedScore(time: number, numberCorrect: number) {
    return 100*Math.pow(numberCorrect / time, 2)
}

export function calculateFixedQuestionScore(time: number, numberCorrect: number) {
    return 100*Math.sqrt(time / numberCorrect)
}

export function calculateStreakScore(time: number, numberCorrect: number) {
    const timePerScore = time / numberCorrect
    return Math.pow((1 / Math.pow(timePerScore, 0.75) + 1 / Math.pow(timePerScore, 1.5)), 0.4) * Math.pow(Math.log(numberCorrect + 1), 2)
}
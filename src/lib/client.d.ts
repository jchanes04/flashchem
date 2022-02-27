import type { Difficulty, PracticeSet, SetItem, Topic, Type, Optional, SetType } from "./global"

export type SetInfo<T extends SetType = SetType> = Omit<PracticeSet<T>, 'items' | 'createdAt' | 'updatedAt'>

export type PracticeState = "loading" | "login-prompt" | "options" | "error" | "practicing" | "results"

export type PracticeOptions = {
    selectedSet: SetInfo,
    practiceMode: PracticeMode,
    practiceTime?: number,
    practiceQuestions?: number,
    postScore: boolean
}

export type PracticeStats = {
    questionNumber: number,
    numberCorrect: number,
    score?: number,
    statistics?: PracticeStatistic[],
    lastQuestion?: LastQuestionData
}

export type NextQuestionResponse = {
    selectedQuestion: SetItem,
    resetExclude: boolean
}

// export type ModeScore = {
//     number: number,
//     units: string
// }

export type PracticeStatistic = {
    figure: number | string,
    units?: string
}

export type LastQuestionData = {
    prompt: string | number,
    correctAnswer: string | number,
    givenAnswer: string | number
}

export type PtableElementInfo = {
    atomicNumber: string,
    symbol: string,
    atomicMass: string,
    gridX: number,
    gridY: number
}
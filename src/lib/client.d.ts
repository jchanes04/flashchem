import type { Difficulty, PracticeSet, SetItem, Topic, Type, Optional } from "./global"

export type PracticeMode = "timed" | "fixed-questions" | "streak" | "infinite"

export type SetInfo = Optional<Omit<PracticeSet, 'items'>, 'createdAt' | 'updatedAt'>

export type PracticeOptions = {
    selectedSet: SetInfo & { isGroupItem: boolean },
    practiceMode: PracticeMode,
    practiceTime?: number,
    practiceQuestions?: number
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
    key: string | number,
    correctAnswer: string | number,
    givenAnswer: string | number
}
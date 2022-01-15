import type { Difficulty, SetItem, Topic, Type } from "./global"

export type PracticeMode = "timed" | "fixed-questions" | "streak" | "infinite"

export type SetInfo = {
    difficulty: Difficulty,
    topic: Topic,
    type: SetType,
    name: string,
    id: string
}

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

export type ModeScore = {
    number: number,
    units: string
}

export type LastQuestionData = {
    key: string | number,
    correctAnswer: string | number,
    givenAnswer: string | number
}
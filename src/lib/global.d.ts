export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Difficulty = "basic" | "intermediate" | "advanced" | "comprehensive"
export type Topic = 
    "atomic numbers" |
    "atomic masses" |
    "periodic table locations" |
    "chemical formulas"

export type PracticeMode = "timed" | "fixed-questions" | "streak" | "infinite"
export type PracticeLength<T> = T extends "timed"
    ? 45 | 135 | 300
    : T extends "fixed-questions"
        ? 20 | 35 | 50
        : "streak"

export type LeaderboardName<T extends PracticeMode> = `${T}-${PracticeLength<T>}`

export type SetType = "list" | "place" | "compare" | "order"

export type SetItem = { prompt: string, answer: string, i: number }

export type PracticeSet<T extends SetType = SetType> = {
    id: string,
    name: string,
    difficulty: Difficulty,
    topic: Topic,
    type: T,
    description: string,
    options: SetOptions<T>
    items: SetItem[],
    createdAt: Date,
    updatedAt: Date
}

type SetOptions<T extends SetType> = T extends "list"
    ? ListOptions
    : T extends "place"
        ? PlaceOptions
        : T extends "compare"
            ? CompareOptions
            : CompareOptions

type ListOptions = {
    inputType: "number" | "text" | "chemical-formula" | "chemical-equation" | "element-symbol"
}

type PlaceOptions = {
    hideAtomicNumber: boolean,
    hideAtomicSymbol: boolean,
    hideAtomicMass: boolean,
    showFBlock: boolean
}

type CompareOptions = {

}

export type UserScore = {
    hash: string,
    setId: string,
    leaderboardName: LeaderboardName,
    userId: string,
    score: number,
    createdAt: Date
}

export type UserData = {
    username: string,
    userId: string,
    settings: UserSettings
}

export type UserSettings = {
    profileVisibility: 'public' | 'private',
    submitScoresByDefault: boolean
}
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Difficulty = "starter" | "basic" | "intermediate" | "advanced" | "complete"
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

export type SetType = "list" | "name" | "place" | "compare"

export type SetItem = { key: string | number, value: string | number, i: number }

export type PracticeSet = {
    id: string,
    name: string,
    difficulty: Difficulty,
    topic: Topic,
    type: SetType,
    description: string,
    etc?: Record<string, any>
    items: SetItem[],
    createdAt: Date,
    updatedAt: Date
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
    userId: string
}
import type { Difficulty, Topic, SetType } from "./global";

export type UserBase = {
    username: string,
    userId: string
}

export type PracticeSet = {
    id: string,
    name: string,
    difficulty: Difficulty,
    topic: Topic,
    type: SetType,
    description: string,
    items: SetItem[],
    createdAt: string,
    updatedAt: string
}
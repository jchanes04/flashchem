export type Difficulty = "starter" | "basic" | "intermediate" | "advanced" | "complete"
export type Topic = 
    "atomic numbers" |
    "atomic masses" |
    "periodic table locations" |
    "chemical formulas"

export type SetType = "list" | "name" | "place" | "compare"

export type SetItem = { key: string | number, value: string | number, i: number }

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
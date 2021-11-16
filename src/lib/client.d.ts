export type Difficulty = "starter" | "basic" | "intermediate" | "advanced" | "complete"
export type Topic = 
    "atomic numbers" |
    "atomic masses" |
    "periodic table locations" |
    "chemical formulas"

export type Type = "list" | "name" | "place" | "compare"
export type PracticeMode = "timed" | "questions" | "streak" | "infinite"

export type SetInfo = {
    difficulty: Difficulty,
    topic: Topic,
    type: Type,
    name: string,
    id: string
}
export type Difficulty = "starter" | "basic" | "intermediate" | "advanced" | "complete"
export type Topic = 
    "atomic numbers" |
    "atomic masses" |
    "periodic table locations" |
    "chemical formulas"

export type SetType = "list" | "name" | "place" | "compare"

export type SetItem = { key: string | number, value: string | number, i: number }
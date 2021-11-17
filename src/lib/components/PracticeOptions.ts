const times = [
    "45 s",
    "90 s",
    "135 s",
    "180 s",
    "240 s",
    "300 s"
]

export const timeFormatter = (v: number, i: number, p: number) => {
    return times[i]
}
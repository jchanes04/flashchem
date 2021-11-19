const times = [
    45,
    90,
    135,
    180,
    240,
    300,
]

export function indexToTime(i: number) {
    return times[i]
}

export const timeFormatter = (v: number) => {
    return times[v]
}

export const timeHandleFormatter = (v: number) => {
    return `${times[v]} seconds`
}
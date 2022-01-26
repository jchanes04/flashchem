const superscriptList: Record<string, string> = {
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
    "0": "⁰",
    "+": "⁺",
    "-": "⁻"
}

export default function toSuperscript(s: string) {
    if (s.length > 1) {
        return s.split("").map(toSuperscript).join("")
    } else {
        return superscriptList[s] ?? s
    }
}
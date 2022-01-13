export default function numberToTime(n: number) {
    return `${Math.floor(n / 60)}:${(n % 60).toString().padStart(2, '0')}`
}
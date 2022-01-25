export default function getTextSizeClass(key: string) {
    if (key.length <= 2) {
        return "large"
    } else if (key.length <= 24) {
        return "medium"
    } else {
        return "small"
    }
}
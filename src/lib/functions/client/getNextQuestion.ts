import type { SetItem } from "$lib/global";

export default function getNextQuestion(questionList: SetItem[], exclude: number[]) {
    const filtered = questionList.filter(x => !exclude.includes(x.i))
    const nextQuestion = filtered[Math.floor(Math.random() * filtered.length)]
    const newExclude = exclude.length > 0.75 * questionList.length
        ? [...exclude.slice(Math.floor(exclude.length / 2)), nextQuestion.i]
        : [...exclude, nextQuestion.i]

    return {
        nextQuestion,
        newExclude
    }
}
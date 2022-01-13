import type { Request } from "@sveltejs/kit";
import { getSetById } from "../../../mongo";

export async function get({ params, query }: Request) {
    const { id } = params
    const practiceSet = await getSetById(id)
    if (!practiceSet) return {
        status: 404
    }

    const excludeList = query.get('exclude')?.split(",").map(x => parseInt(x)) || []
    console.log(excludeList)
    const filtered = practiceSet.items.filter(x => !excludeList.includes(x.i))
    console.log("filtered: ")
    console.dir(filtered)
    
    const selectedQuestion = (filtered.length ? filtered : practiceSet.items)[Math.floor(Math.random() * (filtered.length || practiceSet.items.length))]
    console.log("selectedQuestion: ")
    console.log(selectedQuestion)
    return {
        status: 200,
        body: {
            selectedQuestion,
            resetExclude: !filtered.length
        }
    }
}
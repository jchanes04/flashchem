import type { Request } from "@sveltejs/kit";
import { getSetById } from "$lib/mongo";

export async function get({ params }: Request) {
    const { id } = params
    const practiceSet = await getSetById(id)
    if (!practiceSet) return {
        status: 404
    }
    
    return {
        status: 200,
        body: practiceSet
    }
}
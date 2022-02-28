import { getSetById } from "$lib/mongo";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
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
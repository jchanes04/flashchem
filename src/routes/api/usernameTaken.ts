import { usernameTaken } from "$lib/mongo";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }) {
    let username = url.searchParams.get('username')

    if (username) {
        return {
            status: 200,
            body: {
                username,
                taken: await usernameTaken(username)
            }
        }
    } else {
        return {
            status: 400
        }
    }
}
import type { RequestEvent } from "@sveltejs/kit";
import { usernameTaken } from "$lib/mongo";

export async function get({ url }: RequestEvent) {
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
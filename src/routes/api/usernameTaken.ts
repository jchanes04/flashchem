import type { Request } from "@sveltejs/kit";
import { usernameTaken } from "../../mongo";

export async function get({ query }: Request) {
    let username = query.get('username')

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
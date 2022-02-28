import { getUserFromToken } from "$lib/auth";
import { init } from '$lib/mongo'

init()

const authenticatedEndpoints = ["/account", "/score"]

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    let authToken = event.request.headers.get('cookie')?.split("; ").find(x => x.split("=")[0] === "authToken")?.split("=")[1]
    if (authToken) event.request.headers.set('authorization', authToken)

    return resolve(event)
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ request }) {
    let user = await getUserFromToken(request.headers.get('Authorization'))
    if (user) 
        return {
            loggedIn: true,
            userData: { ...user }
        }

    return {
        loggedIn: false
    }
}
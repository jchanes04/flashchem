import type { RequestEvent } from "@sveltejs/kit";
import { getUserFromToken } from "$lib/auth";
import { init } from '$lib/mongo'
type Resolve = (event: RequestEvent) => Promise<Response>

init()

const authenticatedEndpoints = ["/account", "/score"]

export async function handle({ event, resolve }: { event: RequestEvent, resolve: Resolve }) {
    let authToken = event.request.headers.get('cookie')?.split("; ").find(x => x.split("=")[0] === "authToken")?.split("=")[1]
    if (authToken) event.request.headers.set('authorization', authToken)

    if (authenticatedEndpoints.some(e => event.url.pathname.startsWith(e))) {
        let authenticated = !!(await getUserFromToken(event.request.headers.get('authorization')))
        if (!authenticated) 
            return new Response(null, {
                status: 302,
                headers: {
                    'Location': '/auth/google'
                }
            })
    }

    return resolve(event)
}

export async function getSession({ request }: RequestEvent) {
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
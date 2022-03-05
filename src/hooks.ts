import { getUserFromToken } from "$lib/auth";
import { init } from '$lib/mongo'
import type { RequestEvent, ResolveOptions } from "@sveltejs/kit/types/internal";

type Resolve = (event: RequestEvent, opts?: ResolveOptions) => Response | Promise<Response>

init()

const authenticatedEndpoints = ["/api/settings", "/api/profile"]

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }: { event: RequestEvent, resolve: Resolve }) {
    let authToken = event.request.headers.get('cookie')?.split("; ").find(x => x.split("=")[0] === "authToken")?.split("=")[1]
    if (authToken && !event.request.headers.get('Authorization')) event.request.headers.set('authorization', authToken)

    if (authenticatedEndpoints.some(e => event.url.pathname.startsWith(e))) {
        const user = await getUserFromToken(event.request.headers.get('Authorization'))
        if (user) {
            event.locals.userData = user
        } else {
            return new Response(null, {
                status: 403
            })
        }
    }

    return resolve(event)
}

export async function getSession({ request, locals }: RequestEvent) {
    let user = locals.userData || await getUserFromToken(request.headers.get('Authorization'))
    if (user) 
        return {
            loggedIn: true,
            userData: { ...user }
        }

    return {
        loggedIn: false
    }
}
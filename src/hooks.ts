import type { Request, Response } from "@sveltejs/kit";
import { getUserFromToken } from "./auth";
import { init } from './mongo'
type Resolve = (request: Request<Record<string, any>>) => Response | Promise<Response>

await init()

export async function handle({ request, resolve }: { request: Request, resolve: Resolve }) {
    let endpoint = request.path.split("/")[1]
    let authToken = request.headers.cookie?.split("; ").find(x => x.split("=")[0] === "authToken")?.split("=")[1]
    if (authToken) request.headers.authorization = authToken

    return resolve(request)
}

export async function getSession(request: Request) {
    let user = getUserFromToken(request.headers.authorization)
    if (user) 
        return {
            loggedIn: true,
            userData: user
        }

    return {
        loggedIn: false
    }
}
import type { Optional, UserScore } from "$lib/global";
import { getUserFromToken } from "$lib/auth";
import { addNewScore } from "$lib/mongo";
import jwt from 'jsonwebtoken'
import fs from 'fs'

const privateKey = fs.readFileSync('jwt.key')

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    const body: Optional<UserScore, "createdAt" | "hash"> = await request.json()

    const authorizedUser = await getUserFromToken(request.headers.get('authorization'))
    console.dir(authorizedUser)
    if (authorizedUser.userId === body.userId) {
        const createdAt = new Date()
        body.createdAt = createdAt
        const hash = jwt.sign(body, privateKey, { algorithm: 'RS256' })
        body.hash = hash
        // await addNewScore(<UserScore>formData)
        return {
            status: 201,
            body: "Created"
        }
    } else {
        return {
            status: 403,
            body: "Unauthorized"
        }
    }
}
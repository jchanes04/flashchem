import type { Optional, UserScore } from "$lib/global";
import type { Request, Response } from "@sveltejs/kit";
import { getUserFromToken } from "$lib/auth";
import { addNewScore } from "$lib/mongo";
import jwt from 'jsonwebtoken'
import fs from 'fs'

const privateKey = fs.readFileSync('jwt.key')

export async function post({ body, headers }: Request) {
    let formData: Optional<UserScore, "createdAt" | "hash">;
    try {
        formData = JSON.parse(<string>body)
    } catch {
        return {
            status: 400,
            body: "Bad request"
        }
    }

    const authorizedUser = await getUserFromToken(headers.authorization)
    console.dir(authorizedUser)
    if (authorizedUser.userId === formData.userId) {
        const createdAt = new Date()
        formData.createdAt = createdAt
        const hash = jwt.sign(formData, privateKey, { algorithm: 'RS256' })
        formData.hash = hash
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
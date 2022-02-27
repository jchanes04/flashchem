import { google } from 'googleapis'
import jwt from 'jsonwebtoken'
import base64url from 'base64url'
import fs from 'fs'
import { getUserData } from './mongo'
import env from '$lib/env'

const privateKey = fs.readFileSync('jwt.key')

export const oauth2client = new google.auth.OAuth2(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    import.meta.env.VITE_HOST_URL + "/callback/google"
)

export const authUrl = oauth2client.generateAuthUrl({
    scope: [
        "openid",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]
})

// create and store authTokens
// seperate tokens for each client vs one token served to each?
// invalidate tokens based on how long it's been since theyve been used

export function generateToken(userId: string, time: string | number = '6h') {
    return jwt.sign({ userId }, privateKey, { algorithm: 'RS256', expiresIn: time })
}

export async function getUserFromToken(token: string) {
    try {
        let tokenPayload = <jwt.JwtPayload>jwt.verify(token, privateKey, { algorithms: [ 'RS256' ] })
        let userData = await getUserData(tokenPayload.userId)
        return userData || null
    } catch (e) {
        return null
    }
}

export function generateSignupHash(userId: string) {
    return base64url.encode(JSON.stringify({ userId, time: Date.now() }))
}

export function decryptSignupHash(hash: string) {
    try {
        let decoded = base64url.decode(hash)
        return JSON.parse(decoded)
    } catch {
        return null
    }
}
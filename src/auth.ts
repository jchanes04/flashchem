import { google } from 'googleapis'

export const oauth2client = new google.auth.OAuth2(
    "CLIENT_ID",
    "CLIENT_SECRET",
    "https://localhost:3000/callback/google"
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

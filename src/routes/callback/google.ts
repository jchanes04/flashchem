import { generateSignupHash, generateToken, oauth2client } from "$lib/auth";
import type { Request } from "@sveltejs/kit";
import type { oauth2_v2 } from "googleapis";
import { getUserData } from "$lib/mongo";

export async function get({ query }: Request) {
    let code = query.get('code')
    if (code) {
        const { tokens } = await oauth2client.getToken(code)
        oauth2client.setCredentials(tokens)
        let { data: profileData } = await oauth2client.request<oauth2_v2.Schema$Userinfo>({
            url: 'https://www.googleapis.com/oauth2/v1/userinfo',
            method: "GET"
        })

        let userData = await getUserData(profileData.id)

        if (userData) {
            let token = generateToken(profileData.id)

            return {
                status: 302,
                headers: {
                    'Location': 'https://localhost:3000/account',
                    'Set-Cookie': `authToken=${token};Path=/;HttpOnly;`
                }
            }
        } else {
            let hash = generateSignupHash(profileData.id)

            return {
                status: 302,
                headers: {
                    'Location': `https://localhost:3000/signup?hash=${encodeURIComponent(hash)}`
                }
            }
        }
    }
}
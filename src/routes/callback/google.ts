import { oauth2client } from "../../auth";
import type { Request } from "@sveltejs/kit";

export async function get({ query }: Request) {
    let code = query.get('code')
    if (code) {
        const { tokens } = await oauth2client.getToken(code)
        oauth2client.setCredentials(tokens)
        let { data: profileData } = await oauth2client.request({
            url: 'https://www.googleapis.com/oauth2/v1/userinfo',
            method: "GET"
        })
        
        // use the id in profileData to create a authToken and set the cookie

        return {
            status: 302,
            headers: {
                location: 'https://localhost:3000/account'
            }
        }
    }
}
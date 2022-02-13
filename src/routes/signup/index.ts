import createNewUser from "$lib/functions/server/createNewUser";
import type { RequestEvent } from "@sveltejs/kit";
import { addNewUser } from "$lib/mongo";
import { decryptSignupHash } from "$lib/auth";

export async function get({ url }: RequestEvent) {
    let hash = url.searchParams.get('hash')
    let decrypted = decryptSignupHash(hash)

    if (!(decrypted && decrypted.userId && Date.now() - decrypted.time < 600000)) {
        return {
            status: 302,
            headers: {
                'Location': '/auth/google'
            }
        }
    }
}

export async function post({ request }: RequestEvent) {
    const body = await request.formData()
    let username = body.get('username') as string
    let purpose = body.get('purpose') as string
    let decrypted = decryptSignupHash(body.get('hash') as string)
    if (decrypted && decrypted.userId && Date.now() - decrypted.time < 600000) {
        let newUser = createNewUser({ username, userId: decrypted.userId })
        
        // track purpose field

        let addedUser = await addNewUser(newUser)

        if (addedUser)
            return {
                status: 302,
                headers: {
                    'Location': '/account'
                }
            }
    }
}
import createNewUser from "$lib/functions/createNewUser";
import type { Request } from "@sveltejs/kit";
import type { ReadOnlyFormData } from "@sveltejs/kit/types/helper";
import { addNewUser } from "../../mongo";
import { decryptSignupHash } from "../../auth";

export async function get({ query }: Request) {
    let hash = query.get('hash')
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

export async function post({ body }: Request) {
    let formData = body as ReadOnlyFormData
    let username = formData.get('username')
    let purpose = formData.get('purpose')
    let decrypted = decryptSignupHash(formData.get('hash'))
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
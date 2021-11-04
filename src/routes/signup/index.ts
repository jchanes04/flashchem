import type { Request } from "@sveltejs/kit";
import { decryptSignupHash } from "../../auth";

export async function get({ query }: Request) {
    let hash = query.get('hash')
    console.log('hash: ' + hash)
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
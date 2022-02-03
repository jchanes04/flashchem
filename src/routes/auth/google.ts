import { authUrl } from '$lib/auth'

export async function get() {
    return {
        status: 302,
        headers: {
            location: authUrl
        }
    }
}
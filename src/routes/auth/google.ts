import { authUrl } from '../../auth'

export async function get() {
    return {
        status: 302,
        headers: {
            location: authUrl
        }
    }
}
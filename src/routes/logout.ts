export async function get() {
    return {
        status: 302,
        headers: {
            'Location': '/',
            'Set-Cookie': 'authToken=;Path=/;HttpOnly'
        }
    }
}
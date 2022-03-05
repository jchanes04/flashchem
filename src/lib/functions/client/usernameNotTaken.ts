import type { Writable } from "svelte/store"

export function usernameValidator(session: Writable<App.Session>) {
    let sessionValue
    session.subscribe((value) => {
        sessionValue = value
    })
    return async (value: string) => {
        console.log(value)
        if (value === sessionValue.userData.username) {
            return {
                name: "usernameIsNotTaken",
                valid: true
            }
        }

        return await usernameNotTaken(value)
    }
}

export async function usernameNotTaken(value: string) {
    const res = await fetch(`/api/usernameTaken?username=${encodeURIComponent(value)}`, {
        credentials: 'include'
    })
    const data = await res.json()
    return {
        name: "usernameIsNotTaken",
        valid: data.taken === false
    }
}
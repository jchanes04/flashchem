import splitSettings from "$lib/functions/splitSettings"
import { getUserData, updateProfile } from "$lib/mongo";
import type { RequestEvent } from "@sveltejs/kit/types/internal";

export async function get({ locals }: RequestEvent) {
    return new Response(JSON.stringify(locals.userData.settings))
}

export async function post({ request, locals }: RequestEvent) {
    const body = await request.json()

    const { settings, profileData } = splitSettings(body)
    await updateProfile(locals.userData.userId, profileData, settings)
    return new Response(null, {
        status: 200
    })
}
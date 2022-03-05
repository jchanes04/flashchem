import type { UserSettings } from "$lib/global";

export type UnsplitSettings = { username: string } & UserSettings

export default function splitSettings(unsplit: UnsplitSettings) {
    const settings = {}
    const profileData = {}
    for (const k in unsplit) {
        if (k === "username") {
            profileData[k] = unsplit[k]
        } else {
            settings[k] = unsplit[k]
        }
    }

    return { settings, profileData } as { settings: Partial<UserSettings>, profileData: Partial<{ username: string }> }
}
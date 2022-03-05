import type { UserSettings } from "$lib/global";

export default async function saveSettings(settings: UserSettings) {
    const res = await fetch('/api/settings', {
        method: 'POST',
        body: JSON.stringify(settings)
    })
    return res.status === 200
        ? null
        : "Failed to save settings, try again later"
}
const accountSettingsErrors = {
    "username.required": "Username is required",
    "username.min": "Username must be at least 6 characters",
    "username.max": "Username must be at most 31 characters",
    "username.usernameIsNotTaken": "That username is already taken",
    "profileVisibility.required": "Profile Visibility is required",
    "submitScoresByDefault.required": "Submit Scores By Default is required"
}
export function accountSettingsError(errorName: string) {
    return accountSettingsErrors[errorName] || "Error"
}

const signupErrors = {
    "username.required": "Username is required",
    "username.min": "Username must be at least 6 characters",
    "username.max": "Username must be at most 31 characters",
    "username.usernameIsNotTaken": "That username is already taken",
    "purpose.required": "A purpose is required"
}
export function signupError(errorName: string) {
    return signupErrors[errorName] || "Error"
}
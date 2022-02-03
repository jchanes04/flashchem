import type { UserBase } from "$lib/mongo";

export default function createNewUser(userData: { username: string, userId: string }) {
    return {
        ...userData
    } as UserBase
}
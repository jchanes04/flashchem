import type { UserBase } from "src/mongo";

export default function createNewUser(userData: { username: string, userId: string }) {
    return {
        ...userData
    } as UserBase
}
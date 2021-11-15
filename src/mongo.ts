import {Collection, Db, MongoClient, Document} from 'mongodb'

export type UserBase = {
    username: string,
    userId: string
}

let client = new MongoClient("DATABASE_URL")
let db: Db;
let userData: Collection;
let practiceSets: Collection;
export async function init() {
    try {
        console.log("Connecting...")
        await client.connect()
        console.log("Connected")
        db = client.db("flashchem")
        userData = db.collection("userData")
        practiceSets = db.collection("practiceSets")
        return true
    } catch (e) {
        console.log(e)
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 1000)
        })
        return init()
    }
}

function queryWrapper<X extends any[], R>(func: (...args: X) => R): (...args: X) => R {
    return (...args: X) => {
        if (db) {
            return func(...args)
        } else {
            console.log("Database disconnected")
            return null
        }
    }
}

export const getUserData = queryWrapper(async (userId: string) => {
    return remove_id(userData.findOne({ userId })) as Promise<UserBase>
})

export const usernameTaken = queryWrapper(async (username: string) => {
    return !!(await userData.findOne({ username }))
})

export const addNewUser = queryWrapper(async (user: UserBase) => {
    return userData.insertOne(user)
})

async function remove_id(document: Document | Promise<Document>) {
    let resolved = await document
    if (!resolved) return null

    delete resolved._id
    return resolved
}
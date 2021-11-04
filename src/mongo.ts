import {Collection, Db, MongoClient} from 'mongodb'

let client = new MongoClient("DATABASE_URL")
let db: Db;
let userData: Collection;
export async function init() {
    try {
        console.log("Connecting...")
        await client.connect()
        db = client.db("flashchem")
        userData = db.collection("userData")
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
    if (db) {
        return func
    } else {
        console.log("Database disconnected")
        return () => null
    }
}

export const getUserData = queryWrapper(async (userId: string) => {
    return userData.findOne({ userId })
})

export const usernameTaken = queryWrapper(async (username: string) => {
    return !!userData.findOne({ username })
})
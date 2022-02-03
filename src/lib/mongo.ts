import type { UserBase } from '$lib/server';
import { Collection, Db, MongoClient, Document, FindCursor } from 'mongodb'
import type { PracticeSet, UserScore } from '$lib/global';
import env from '$lib/env';


let client = new MongoClient(env.DATABASE_URL)
let db: Db;
let userData: Collection;
let practiceSets: Collection<PracticeSet>;
let userScores: Collection<UserScore>;
export async function init() {
    try {
        console.log("Connecting...")
        await client.connect()
        console.log("Connected")
        db = client.db("flashchem")
        userData = db.collection("userData")
        practiceSets = db.collection("practiceSets")
        userScores = db.collection("userScores")
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

export const getSetById = queryWrapper(async (id: string) => {
    return remove_id(practiceSets.findOne({ id })) as Promise<PracticeSet>
})

export const getScoreByHash = queryWrapper(async (hash: string) => {
    return remove_id(userScores.findOne({ hash })) as Promise<UserScore>
})

export const getScoresBySet = queryWrapper(async (setId: string) => {
    const findCursor: FindCursor<UserScore> = userScores.find({ setId })
    const scoresArray = await findCursor.toArray()
    return Promise.all(scoresArray.map(x => remove_id<UserScore>(x)))
})

export const getScoresByUser = queryWrapper(async (userId: string) => {
    const findCursor: FindCursor<UserScore> = userScores.find({ userId })
    const scoresArray = await findCursor.toArray()
    return Promise.all(scoresArray.map(x => remove_id<UserScore>(x)))
})

export const addNewScore = queryWrapper(async (scoreData: UserScore) => {
    return userScores.insertOne(scoreData)
})

async function remove_id<T>(document: Document | Promise<Document>): Promise<T> {
    let resolved = await document
    if (!resolved) return null

    const {_id, ...output} = resolved
    return output
}
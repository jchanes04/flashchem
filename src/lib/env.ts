import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

const envFileData = fs.readFileSync(path.resolve(process.cwd(), '.env'), { encoding: 'utf-8' })
const env = dotenv.parse(envFileData)
export default env
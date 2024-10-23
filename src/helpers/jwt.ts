import { sign, verify } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const SECRET = process.env.SECRET!

interface Payload {
  id : number
  username: string
}

export default class JWT {

  static sign(payload: Payload) {
    return sign(payload, SECRET!)
  }

  static verify(token: string) {
    return verify(token, SECRET!)
  }
  
}
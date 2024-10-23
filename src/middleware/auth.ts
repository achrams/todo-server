import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import JWT from '../helpers/jwt'
import { AppData } from '../data-source'
import { TodoEntity } from '../models/Todo.entity'
import { UserEntity } from '../models/User.entity'
import { UserRequest } from '../helpers/app.interface'

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) throw ({ status: 401, message: 'Not Authenticated.', data: null })

    const decoded: string | JwtPayload = JWT.verify(token)
    if (typeof decoded === 'object') {
      (req as UserRequest).id = decoded.id
      next()
    }
    else throw ({ status: 401, message: 'Not Authenticated.', data: null })


  } catch (err) {
    return next(err)
  }
}

export const Authorize = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const current = await AppData.getRepository(TodoEntity).findOne({ where: { id: +id } })
    if (current) {
      (req as UserRequest).todo = current
      if (+current.user === (req as UserRequest).id) next()
      else throw ({ status: 401, message: 'Not Authorized.', data: null })
    } else throw({ status: 404, message: 'Data Not Found.', data: null })

  } catch (err) {
    return next(err)
  }
}
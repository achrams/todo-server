import { TodoEntity } from "../models/Todo.entity"
import { Request } from "express"

export interface UserRequest extends Request {
  id: number
  todo? : TodoEntity
}
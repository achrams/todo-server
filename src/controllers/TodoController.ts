import { NextFunction, Request, Response } from "express";
import { AppData } from "../data-source";
import { TodoEntity } from "../models/Todo.entity";
import { UserRequest } from "../helpers/app.interface";
import { UserEntity } from "../models/User.entity";

export default class TodoController {

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await AppData
        .getRepository(TodoEntity)
        .createQueryBuilder('todo')
        .where('todo.user = :user', { user: (req as UserRequest).id })
        .orderBy('todo."updatedAt"')
        .getMany()

      if (list.length) {
        res.status(200).json({ message: 'Success Get Todo List.', data: list })
      }
      else throw ({ status: 404, message: 'Todo List is Empty.', data: [] })

    } catch (err) {
      return next(err)
    }
  }

  static async addTodo(req: Request, res: Response, next: NextFunction) {
    const { subject, description } = req.body
    const userId = (req as UserRequest).id
    try {
      if (userId) {
        const user = await AppData
          .getRepository(UserEntity)
          .createQueryBuilder('user')
          .where('user.id = :id', { id: userId! })
          .getOne()

        if (!user) {
          throw ({ status: 404, message: 'User not found.' })
        }

        const current = await AppData
          .getRepository(TodoEntity)
          .createQueryBuilder('todo')
          .orderBy('todo.id', 'DESC')
          .getOne()
        let generatedNumber = ''

        if (current) {
          const x = current ? +(current.activityNumber.split('-')[1]) + 1 : 1
          generatedNumber = `AC-${x.toString().padStart(4, '0')}`
        } else {
          generatedNumber = `AC-0001`
        }

        const newTodo = new TodoEntity()
        newTodo.subject = subject
        newTodo.description = description
        newTodo.user = user
        newTodo.status = "Unmarked"

        const added = await AppData
          .createQueryBuilder()
          .insert()
          .into(TodoEntity)
          .values({
            subject: newTodo.subject,
            description: newTodo.description,
            user: newTodo.user,
            status: newTodo.status,
            activityNumber: generatedNumber
          })
          .execute()
        res.status(201).json({ message: 'Todo added successfully.', data: added })
      } else {
        throw ({ status: 401, message: 'User not Authenticated.' })
      }

    } catch (err) {
      return next(err)
    }
  }

  static async editMark(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { status } = req.body

    try {
      const updated = await AppData
        .createQueryBuilder()
        .update(TodoEntity)
        .set({ status })
        .where("id = :id", { id })
        .execute()
      console.log(updated)
      if (!updated) throw ({ message: 'Failed to Update.', data: null })
      res.status(201).json({ message: 'Record Updated.', data: updated })

    } catch (err) {
      return next(err)
    }
  }

  static async updateTodo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { subject, description } = req.body
    try {
      if ((req as UserRequest).todo?.status !== 'Unmarked') throw ({ status: 401, message: 'Cannot Update Todo.', data: null })

      const updated = await AppData
        .createQueryBuilder()
        .update(TodoEntity)
        .set({ subject, description })
        .where("id = :id", { id })
        .execute()
      if (!updated) throw ({ message: 'Failed to Update.', data: null })
      res.status(201).json({ message: 'Record Updated.', data: updated })

    } catch (err) {
      return next(err)
    }
  }

  static async deleteTodo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      console.log((req as UserRequest).todo?.status)
      if ((req as UserRequest).todo?.status != 'Unmarked') throw ({ status: 401, message: 'Cannot Delete Todo.', data: null })
      else {

        const deleted = await AppData
          .createQueryBuilder()
          .delete()
          .from(TodoEntity)
          .where("id = :id", { id })
          .execute()

        if (!deleted) throw ({ message: 'Failed to Update.', data: null })
        res.status(201).json({ message: 'Record Updated.', data: deleted })
      }
    } catch (err) {
      return next()
    }
  }
}
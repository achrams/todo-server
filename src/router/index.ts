import { Authenticate, Authorize } from '../middleware/auth'
import UserController from '../controllers/UserController'
import TodoController from '../controllers/TodoController'
import { Router, Request, Response } from "express"

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'OK', data: null })
})

router.get('/todo', Authenticate, TodoController.getAll)
router.post('/todo', Authenticate, TodoController.addTodo)
router.put('/todo/:id', Authenticate, Authorize, TodoController.updateTodo)
router.patch('/todo/:id', Authenticate, Authorize, TodoController.editMark)
router.delete('/todo/:id', Authenticate, Authorize, TodoController.deleteTodo)

router.post('/user/register', UserController.register)
router.post('/user/login', UserController.login)

export default router
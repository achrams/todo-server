import { UserEntity } from "../models/User.entity";
import { NextFunction, Request, Response } from "express";
import { AppData } from "../data-source";
import Password from "../helpers/bcrypt";
import JWT from "../helpers/jwt";

export default class UserController {

  static async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body

    try {
      const user = await AppData
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.userName = :username', { username })
      .getOne()

      if (user) {
        if (user.status !== 'Active') {
          throw ({ status: 403, message: 'User Suspended.', data: null })
        }
        else {
          const compared = await Password.compare(password, user.password)
          if (compared) {
            const token = JWT.sign({ id: user.id, username: user.userName })

            res.status(201)
              .json({
                message: 'Logged In.',
                data: {
                  user: {
                    id: user.id,
                    username: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName
                  },
                  token: token
                }
              })
          } else {
            throw ({ status: 401, message: 'Wrong Password.', data: null })
          }
        }
      } else throw ({ status: 404, message: 'User Not Found.', data: null })
    } catch (err) {
      return next(err)
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    const { username, firstName, lastName, password, verifyPassword } = req.body;

    try {
      // Check for existing user
      const user = await AppData.getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.userName = :username', { username })
        .getOne();

      if (user) {
        return next({ status: 401, message: 'Username already exists.' });
      }

      // Check password match
      if (password !== verifyPassword) {
        return next({ status: 401, message: 'Password mismatch.' });
      }

      // Encrypt password
      const hashedPassword = await Password.encrypt(password);
      
      // Create new user
      const newUser = new UserEntity();
      newUser.userName = username;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = hashedPassword;
      newUser.status = 'Active';

      // Insert new user into database
      await AppData.getRepository(UserEntity).save(newUser); // Using save() for simplicity

      res.status(201).json({ message: 'User Registered.', data: null });
    } catch (error) {
      console.error('Registration error:', error);
      return next({ status: 500, message: 'Internal server error.' });
    }
  }
}
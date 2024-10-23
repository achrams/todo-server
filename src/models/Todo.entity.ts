import { AppData } from "../data-source"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, getManager, ManyToOne } from "typeorm"
import { UserEntity } from "./User.entity"

@Entity({ schema: 'public', name: 'todo' })
export class TodoEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  subject!: string

  @Column()
  description?: string

  @Column()
  status!: string

  @Column({ unique: true })
  activityNumber!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @ManyToOne(() => UserEntity, (user) => user.todoList)
  @Column({ name: "userId", type: Number })
  user!: UserEntity

}
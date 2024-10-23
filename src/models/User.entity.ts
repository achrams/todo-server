import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TodoEntity } from "./Todo.entity";

@Entity({ schema: 'public', name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userName!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  password!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @Column({ default: 'Active' })
  status!: string;

  @OneToMany(() => TodoEntity, (todo: TodoEntity) => todo.user)
  todoList?: TodoEntity[];
}

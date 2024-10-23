import { DataSource } from "typeorm"
import { UserEntity } from "./models/User.entity"
import { TodoEntity } from "./models/Todo.entity"

export const AppData = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'akasia',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: false
})

const initializeApp = async () => {
  try {
    await AppData.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
  }
}

initializeApp();

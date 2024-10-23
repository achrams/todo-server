import express,{ Express } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import router from "./router";
import errorHandler from "./middleware/errorHandler";
import 'reflect-metadata'
dotenv.config()

const app: Express = express()
const PORT : number = +process.env.PORT! || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`App is running on PORT : ${PORT}`)
})
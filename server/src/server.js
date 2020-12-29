import express from "express"
import cors from "cors"
import userRoute from "./user/user.route"
import todoRoute from "./todo/todo.route"
import { verifyToken } from "./middleware/jwt"
import { errorHandler } from "./middleware/requestHandler"

const app = express()
const PORT = 5000 || process.env.PORT

app.use(cors())
app.use(express.json())
app.use("/api", userRoute)
app.use("/api/todos", verifyToken, todoRoute)
app.use(errorHandler)

export default () => {
  app.listen(PORT, () => console.log(`Server up and running on port: ${PORT}.`))
}

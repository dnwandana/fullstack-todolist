import { Router } from "express"
import {
  listsTodoController,
  createTodoController,
  getTodoController,
  updateTodoController,
  deleteTodoController,
} from "./todo.controller"
import { methodHandler } from "../middleware/requestHandler"

const router = Router()

router
  .route("/")
  .get(listsTodoController)
  .post(createTodoController)
  .all(methodHandler("GET, POST"))

router
  .route("/:id")
  .get(getTodoController)
  .patch(updateTodoController)
  .delete(deleteTodoController)
  .all(methodHandler("GET, PATCH, DELETE"))

export default router

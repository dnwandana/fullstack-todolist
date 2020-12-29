import { Router } from "express"
import { registerController, loginController } from "./user.controller"
import { methodHandler } from "../middleware/requestHandler"

const router = Router()

router
  .route("/register")
  .post(registerController)
  .all(methodHandler("POST"))

router
  .route("/login")
  .post(loginController)
  .all(methodHandler("POST"))

export default router

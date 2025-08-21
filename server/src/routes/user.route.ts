import { Router } from "express"
import { registerUser } from "../services/user.service.js";

const userRouter = Router();


userRouter.post("/signup",registerUser)
userRouter.post("/login",registerUser)

export default userRouter;




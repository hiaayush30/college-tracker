import { Router } from "express";
import { login, registerUser, logout } from "../services/user.service.js";
const userRouter = Router();
userRouter.post("/signup", registerUser);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
export default userRouter;
//# sourceMappingURL=user.route.js.map
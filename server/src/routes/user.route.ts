import { Router } from "express"

const userRouter = Router();


userRouter.get("/", (req, res) => {
    res.json("Hello There")
})

export default userRouter;




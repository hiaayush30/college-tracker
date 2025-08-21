import { Router } from "express";
// const { Router } = require("express")
const userRouter = Router();
userRouter.get("/", (req, res) => {
    res.json("Hello There");
});
export default userRouter;
//# sourceMappingURL=user.route.js.map
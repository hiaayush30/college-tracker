import { Router } from "express";
import { addClass, deleteClass, updateClass } from "../services/class.service.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";
const classRouter = Router();
classRouter.post("/", adminMiddleware, addClass);
classRouter.put("/", adminMiddleware, updateClass);
classRouter.delete("/", adminMiddleware, deleteClass);
export default classRouter;
//# sourceMappingURL=class.route.js.map
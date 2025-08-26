import {Router} from "express";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { addAssigment, deleteAssignment, updateAssignment } from "../services/assignment.service.js";

const assignmentRouter = Router();

assignmentRouter.post("/",adminMiddleware, addAssigment);
assignmentRouter.put("/",adminMiddleware, updateAssignment);
assignmentRouter.delete("/",adminMiddleware, deleteAssignment);

export default assignmentRouter;
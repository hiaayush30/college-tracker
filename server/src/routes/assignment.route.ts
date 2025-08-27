import {Router} from "express";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { addAssigment, deleteAssignment, getAssignments, updateAssignment } from "../services/assignment.service.js";

const assignmentRouter = Router();

assignmentRouter.get("/",getAssignments);
assignmentRouter.post("/",adminMiddleware, addAssigment);
assignmentRouter.put("/",adminMiddleware, updateAssignment);
assignmentRouter.delete("/:id",adminMiddleware, deleteAssignment);

export default assignmentRouter;
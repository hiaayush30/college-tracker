import {Router} from "express";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { addAssigment, deleteAssignment, getAssignment, getAssignments, updateAssignment } from "../services/assignment.service.js";

const assignmentRouter = Router();

assignmentRouter.get("/",getAssignments);
assignmentRouter.get("/:id",getAssignment);
assignmentRouter.post("/",adminMiddleware, addAssigment);
assignmentRouter.put("/",adminMiddleware, updateAssignment);
assignmentRouter.delete("/:id",adminMiddleware, deleteAssignment);

export default assignmentRouter;
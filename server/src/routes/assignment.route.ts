import { Router } from "express";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { addAssigment, deleteAssignment, getAssignment, getAssignments, toggleComplete, updateAssignment } from "../services/assignment.service.js";

const assignmentRouter = Router();

assignmentRouter.get("/", getAssignments);
assignmentRouter.get("/:id", getAssignment);
assignmentRouter.post("/", adminMiddleware, addAssigment);
assignmentRouter.put("/", adminMiddleware, updateAssignment);
assignmentRouter.delete("/:id", adminMiddleware, deleteAssignment);
assignmentRouter.patch("/toggle/:id", toggleComplete);

export default assignmentRouter;
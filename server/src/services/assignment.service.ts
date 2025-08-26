import type { Request, Response } from "express";
import { addAssignmentSchema, updateAssignmentSchema } from "../schema/assignment.schema.js";
import Assignment from "../models/assignment.model.js";

export const addAssigment = async (req: Request, res: Response) => {
    try {
        const parsed = addAssignmentSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }
        const { due, program, semester, subject, type, url } = parsed.data;
        const newAssignment = await Assignment.create({
            createdBy: req.user?._id,
            due,
            program,
            semester,
            subject,
            type,
            url
        });
        res.status(201).json(newAssignment);
    } catch (err) {
        console.error("Error adding class:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateAssignment = async (req: Request, res: Response) => {
    try {
        const bodyCheck = updateAssignmentSchema.safeParse(req.body);
        if (!bodyCheck.success) {
            return res.status(400).json({ error: bodyCheck.error.flatten() });
        }
        const { id, ...updateData } = bodyCheck.data;
        const assignment = await Assignment.findByIdAndUpdate(
            { _id: id },
            { $set: updateData }, // update all fields from bodyCheck.data
            { new: true }         // return the updated document
        );
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        res.status(200).json(assignment);
    } catch (err) {
        console.error("Error updating class:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if(!id){
      return res.status(403).json({
        error:"Assignment id required"
      })
    }
    const deleted = await Assignment.findByIdAndDelete({_id:id});
    if (!deleted) {
      return res.status(404).json({ error: "Assignment not found" });
    }
    // TODO delete the object from s3 bucket
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (err) {
    console.error("Error deleting assignment:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
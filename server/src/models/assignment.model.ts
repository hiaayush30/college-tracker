import mongoose, { Schema, Document, Model, type ObjectId } from "mongoose";
import type z from "zod";
import type { addAssignmentSchema } from "../schema/assignment.schema.js";

type AddAssignmentType = z.infer<typeof addAssignmentSchema>;

export interface IAssignment extends Document, AddAssignmentType {
    createdAt: Date;
    updatedAt: Date;
    createdBy: ObjectId
}

const AssignmentSchema: Schema<IAssignment> = new Schema(
    {
        type: {
            type: String,
            required: true,
            trim: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        url: {
            type: String
        },
        due: {
            type: Date,
            required: true,
        },
        semester: {
            type: String,
            required: true
        },
        program: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

const Assignment: Model<IAssignment> = mongoose.model<IAssignment>("Assigment", AssignmentSchema);

export default Assignment;

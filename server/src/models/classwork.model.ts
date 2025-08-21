import mongoose, { Schema, Document, Model, type ObjectId } from "mongoose";

export interface IClasswork extends Document {
    name: string;
    classworkURL?: string;
    solutionURL?: string;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    createdBy: ObjectId
}

const ClassworkSchema: Schema<IClasswork> = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        dueDate: {
            type: Date,
            required: true
        },
        classworkURL: {
            type: String,
            required: false
        },
        solutionURL: {
            type: String,
            required: false
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

const Classwork: Model<IClasswork> = mongoose.model<IClasswork>("Classwork", ClassworkSchema);

export default Classwork;

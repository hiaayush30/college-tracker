import mongoose, { Schema, Document, Model, type ObjectId } from "mongoose";

export interface ISubject extends Document {
    name: string;
    classworks : ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: ObjectId
}

const SubjectSchema: Schema<ISubject> = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        classworks:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Classwork"
        }]
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

const Subject: Model<ISubject> = mongoose.model<ISubject>("Subject", SubjectSchema);

export default Subject;

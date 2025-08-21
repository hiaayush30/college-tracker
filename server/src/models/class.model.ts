import mongoose, { Schema, Document, Model, type ObjectId } from "mongoose";

export interface IClass extends Document {
    name: string;
    subjects : ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: ObjectId
}

const ClassSchema: Schema<IClass> = new Schema(
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
        subjects:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subject"
        }]
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

const Class: Model<IClass> = mongoose.model<IClass>("Class", ClassSchema);

export default Class;

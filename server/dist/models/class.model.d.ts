import { Document, Model, type ObjectId } from "mongoose";
export interface IClass extends Document {
    name: string;
    subjects: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: ObjectId;
}
declare const Class: Model<IClass>;
export default Class;
//# sourceMappingURL=class.model.d.ts.map
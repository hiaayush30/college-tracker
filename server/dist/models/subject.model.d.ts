import { Document, Model, type ObjectId } from "mongoose";
export interface ISubject extends Document {
    name: string;
    classworks: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: ObjectId;
}
declare const Subject: Model<ISubject>;
export default Subject;
//# sourceMappingURL=subject.model.d.ts.map
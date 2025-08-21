import { Document, Model, type ObjectId } from "mongoose";
export interface IClasswork extends Document {
    name: string;
    classworkURL?: string;
    solutionURL?: string;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    createdBy: ObjectId;
}
declare const Classwork: Model<IClasswork>;
export default Classwork;
//# sourceMappingURL=classwork.model.d.ts.map